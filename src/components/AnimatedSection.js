'use client';

import { useEffect, useRef, useState } from "react";

function AnimatedSection({ children }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Если секция видна — включаем анимацию
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false); // Если выходит за экран — сбрасываем, чтобы анимация повторялась
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-all duration-[1200ms] ease-out transform 
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {children}
    </section>
  );
}
