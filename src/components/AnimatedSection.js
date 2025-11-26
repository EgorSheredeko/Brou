"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedSection({ children }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // секция считается видимой, когда 30% в viewport
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
