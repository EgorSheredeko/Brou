"use client";

import { useEffect, useRef, useState } from "react";

export default function MiniGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false); // Игра стартует только после кнопки

  const touchStart = useRef({ x: 0, y: 0 });
  const speed = 10; // скорость
  const tileSize = 20; // размер сегмента

  useEffect(() => {
    if (!started) return;

    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (dir.y === 0) setDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (dir.y === 0) setDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (dir.x === 0) setDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (dir.x === 0) setDir({ x: 1, y: 0 });
          break;
      }
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && dir.x === 0) setDir({ x: 1, y: 0 });
        else if (dx < 0 && dir.x === 0) setDir({ x: -1, y: 0 });
      } else {
        if (dy > 0 && dir.y === 0) setDir({ x: 0, y: 1 });
        else if (dy < 0 && dir.y === 0) setDir({ x: 0, y: -1 });
      }

      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [dir, started]);

  useEffect(() => {
    if (!started) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const grid = tileSize;
    const tileCount = canvas.width / grid;

    const moveSnake = () => {
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= tileCount ||
        head.y >= tileCount ||
        snake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        setGameOver(true);
        return;
      }

      let newSnake = [head, ...snake];

      if (newSnake.length >= tileCount * tileCount) {
        setWon(true);
        return;
      }

      if (head.x === food.x && head.y === food.y) {
        let newFood;
        do {
          newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
          };
        } while (newSnake.some((s) => s.x === newFood.x && s.y === newFood.y));
        setFood(newFood);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const draw = () => {
      ctx.fillStyle = "#ffe6f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff99cc";
      ctx.fillRect(food.x * grid, food.y * grid, grid, grid);

      ctx.fillStyle = "#ff66b2";
      snake.forEach((s) => ctx.fillRect(s.x * grid, s.y * grid, grid - 1, grid - 1));
    };

    const interval = setInterval(() => {
      if (!gameOver && !won) {
        moveSnake();
        draw();
      }
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [snake, dir, food, gameOver, won, started]);

  const startGame = () => setStarted(true);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir({ x: 1, y: 0 });
    setFood({ x: 15, y: 15 });
    setGameOver(false);
    setWon(false);
    setStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <h1 className="text-3xl mb-4 font-bold text-pink-600">Моя миленькая змейка 🐍💖</h1>
      <p className="text-center text-pink-400 mb-6 max-w-md">
        Я сделал тебе эту змейку, чтобы ты не скучал иногда мой милый бро 
      </p>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-4 border-pink-300 rounded-lg touch-none mb-4"
      ></canvas>

      {!started && (
        <button
          onClick={startGame}
          className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-bold"
        >
          Сыграть 💖
        </button>
      )}

      {gameOver && (
        <div className="mt-4 text-center animate-fadeIn">
          <p className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">
            Игра окончена! Попробуй снова 💖
          </p>
          <button
            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full mt-2"
            onClick={restartGame}
          >
            Попробовать снова 💖
          </button>
        </div>
      )}

      {won && (
        <div className="mt-4 text-center animate-fadeIn">
          <p className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">
            С победой, мое любимое солнышко! 🌸💖
          </p>
          <button
            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full mt-2"
            onClick={restartGame}
          >
            Играть снова 💖
          </button>
        </div>
      )}
    </div>
  );
}
