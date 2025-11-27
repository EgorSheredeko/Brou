"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (e) => {
    const heart = document.createElement("div");
    heart.innerText = "❤️";
    heart.style.position = "absolute";
    heart.style.left = `${e.clientX - 12}px`;
    heart.style.top = `${e.clientY - 12}px`;
    heart.style.fontSize = "24px";
    heart.style.pointerEvents = "none";
    heart.style.transition = "transform 1s ease-out, opacity 1s ease-out";
    heart.style.zIndex = 9999;
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = "translateY(-50px) scale(1.5)";
      heart.style.opacity = "0";
    });

    setTimeout(() => {
      heart.remove();
    }, 1000);
  };

  const navItems = [
    { name: "Домик", href: "/" },
    { name: "Мини-игра", href: "/mini-game" },
    { name: "Сюрприз", href: "/surprise" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-pink-100/70 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-pink-700">Мой милый бро</div>

        {/* Кнопка гамбургер */}
        <button
          className="md:hidden text-pink-700 text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Меню */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row gap-6 md:gap-8 text-pink-600 font-semibold`}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleClick}
              className="hover:text-pink-800 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
