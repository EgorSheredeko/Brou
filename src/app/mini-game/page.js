"use client";

import { useEffect, useRef, useState } from "react";

export default function MiniGame() {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    // Включаем fullscreen
    if (canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen();
    }
    setFullscreen(true);
  };

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const gridSize = 20; // размер клетки
    const snakeSize = 20; // размер змейки
    const speed = 150; // задержка в мс (чуть медленнее)
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let snake = [{ x: 5, y: 5 }];
    let apple = { x: 10, y: 10 };
    let score = 0;

    // свайпы для мобильных
    let touchStartX = 0;
    let touchStartY = 0;
    canvas.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    });
    canvas.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction.x === 0) nextDirection = { x: 1, y: 0 };
        if (dx < 0 && direction.x === 0) nextDirection = { x: -1, y: 0 };
      } else {
        if (dy > 0 && direction.y === 0) nextDirection = { x: 0, y: 1 };
        if (dy < 0 && direction.y === 0) nextDirection = { x: 0, y: -1 };
      }
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    });

    // клавиши
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && direction.y === 0) nextDirection = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && direction.y === 0) nextDirection = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && direction.x === 0) nextDirection = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && direction.x === 0) nextDirection = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", handleKey);

    const placeApple = () => {
      apple = {
        x: Math.floor(Math.random() * (width / gridSize)),
        y: Math.floor(Math.random() * (height / gridSize)),
      };
    };

    const gameLoop = () => {
      direction = nextDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      // проверка на победу
      if (snake.length * snakeSize >= width * height) {
        alert("С победой, мое любимое солнышко! 🌸");
        return;
      }

      // проверка столкновения с собой
      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        alert("Проигрыш  Попробуй ещё раз!");
        return;
      }

      snake.unshift(head);

      // проверка яблока
      if (head.x === apple.x && head.y === apple.y) {
        score++;
        placeApple();
      } else {
        snake.pop();
      }

      // очистка
      ctx.fillStyle = "#fff0f5"; // милый розовый фон
      ctx.fillRect(0, 0, width, height);

      // яблоко
      ctx.fillStyle = "#ff69b4";
      ctx.fillRect(apple.x * gridSize, apple.y * gridSize, snakeSize, snakeSize);

      // змейка
      ctx.fillStyle = "#ffb6c1"; // розовая змейка
      snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, snakeSize, snakeSize);
      });
    };

    const interval = setInterval(gameLoop, speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [gameStarted]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {!gameStarted && (
        <div className="text-center">
          <p className="text-pink-600 mb-4 text-xl">
            Я сделал тебе эту змейку, чтоб ты не скучал временами 
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition"
          >
            Сыграть
          </button>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full mt-4" />
    </div>
  );
}
