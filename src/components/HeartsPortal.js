// src/components/HeartsPortal.js
"use client";

import { useEffect, useState } from "react";

export default function HeartsPortal() {
  const [hearts, setHearts] = useState([]);

  const createHeart = (x, y) => {
    const id = Date.now();
    setHearts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000); // анимация длится 1 сек
  };

  useEffect(() => {
    // ловим клики только по ссылкам в Header
    const handleClick = (e) => {
      const target = e.target;
      if (target.tagName === "A" && target.closest("header")) {
        const rect = target.getBoundingClientRect();
        createHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: heart.x - 12 + "px",
            top: heart.y - 12 + "px",
            fontSize: "24px",
            pointerEvents: "none",
          }}
          className="animate-heart"
        >
          ❤️
        </div>
      ))}
      <style jsx>{`
        .animate-heart {
          transform: translateY(0) scale(1);
          opacity: 1;
          animation: floatHeart 1s forwards;
        }
        @keyframes floatHeart {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
