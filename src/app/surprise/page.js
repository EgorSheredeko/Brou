"use client";

import { useState } from "react";

export default function Surprise() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-6 animate-pulse">
        Сюрприз для тебя! 💖🎉
      </h1>

      <p className="text-center text-pink-400 mb-8 max-w-lg text-lg md:text-xl">
        Я сделал эту страницу специально, чтобы поднять тебе настроение 😇. 
        Здесь твой <span className="font-bold text-pink-500">купон на мое внимание, обнимашки и поцелуйчики 💌</span> безлимит!
      </p>

      <div className="relative w-64 h-40 mb-6 cursor-pointer" onClick={() => setClicked(true)}>
        <div className="absolute inset-0 bg-pink-300 rounded-2xl shadow-lg flex items-center justify-center transition-transform transform hover:scale-105">
          <span className="text-white text-2xl font-bold">
            🎟️ Купон
          </span>
        </div>
      </div>

      {clicked && (
        <div className="text-center animate-fadeIn mt-4">
          <p className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">
            💖 Ура! Ты активировал купон! 💖
          </p>
          <p className="text-pink-400 text-lg md:text-xl">
            Обнимашки и поцелуйчики готовы к использованию 😘✨
          </p>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-pink-300 rounded-full opacity-70 animate-float"
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.7; }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
