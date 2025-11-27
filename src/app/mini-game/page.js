"use client";

import { useEffect, useRef, useState } from "react";

export default function MiniGame() {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [message, setMessage] = useState("");

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [apple, setApple] = useState({ x: 15, y: 15 });
  const [speed, setSpeed] = useState(200);
  const gridSize = 20;
  const tileSize = 20;
  const canvasWidth = 400;
  const canvasHeight = 400;

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setApple({ x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) });
    setSpeed(200);
    setGameRunning(true);
    setMessage("");
  };

  useEffect(() => {
    // запрет скролла
    if (gameRunning) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [gameRunning]);

  useEffect(() => {
    if (!gameRunning) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    let touchStartX = null;
    let touchStartY = null;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const handleTouchMove = (e) => {
      if (!touchStartX || !touchStartY) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction.x === 0) setDirection({ x: 1, y: 0 });
        if (dx < 0 && direction.x === 0) setDirection({ x: -1, y: 0 });
      } else {
        if (dy > 0 && direction.y === 0) setDirection({ x: 0, y: 1 });
        if (dy < 0 && direction.y === 0) setDirection({ x: 0, y: -1 });
      }
      touchStartX = null;
      touchStartY = null;
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);

    const gameLoop = setInterval(() => {
      setSnake((prev) => {
        const head = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };

        // проверка границ
        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          prev.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setGameRunning(false);
          setMessage("Ой, ты врезался! Попробуй снова 💖");
          return prev;
        }

        const newSnake = [head, ...prev];

        // проверка яблока
        if (head.x === apple.x && head.y === apple.y) {
          // новое яблоко
          setApple({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
          if (speed > 50) setSpeed(speed - 5); // ускорение
          return newSnake;
        } else {
          newSnake.pop();
          return newSnake;
        }
      });
    }, speed);

    const draw = () => {
      ctx.fillStyle = "#ffe4e6";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // яблоко
      ctx.fillStyle = "#f472b6";
      ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

      // змейка
      ctx.fillStyle = "#ec4899";
      snake.forEach((segment) =>
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize)
      );

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gameRunning, direction, snake, speed, apple]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Мини-игра: миленькая змейка 🐍
      </h1>
      <p className="text-pink-500 mb-4 text-center max-w-md">
        Я сделал тебе эту змейку, чтоб ты не скучал временами 🙂
      </p>
      {!gameRunning && (
        <button
          onClick={startGame}
          className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-lg mb-4"
        >
          Играть
        </button>
      )}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="border-2 border-pink-300 rounded-lg touch-none"
      />
      {message && <p className="text-pink-500 mt-4 text-center">{message}</p>}
    </div>
  );
}
