'use client';

import { useEffect, useRef, useState } from "react";

// Повторяемая анимация секций
function AnimatedSection({ children }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false); // сброс анимации, чтобы она повторялась
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

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden scrollbar-hide font-sans">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <img src="/background-placeholder.jpg" alt="Background texture" className="w-full h-full object-cover opacity-20" />
      </div>

      {/* HERO */}
      <AnimatedSection>
        <section className="flex flex-col items-center justify-center text-center p-10 min-h-[75vh] bg-white/5 shadow-xl">
          <h1 className="text-5xl md:text-7xl font-semibold mb-6">
            Скорейшего выздоровления, мой стильный и милый броу ❤️
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl">
            Серьёзно переживаю за тебя, броу. Хочу, чтобы ты быстрее восстановился и чувствовал себя лучше. Мы ещё не встречаемся, но я правда надеюсь, что когда-нибудь мы будем ближе. Ты мне очень нравишься, и я хочу, чтобы ты это знал.
          </p>
        </section>
      </AnimatedSection>

      {/* SECTION 1 */}
      <AnimatedSection>
        <section className="flex flex-col md:flex-row items-center justify-between p-10 min-h-[75vh] bg-gray-100/5 shadow-lg">
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold mb-4">Почему я так за тебя переживаю? Потому что ты действительно замечательный парень, и видеть, что такой классный человек болеет — это очень тяжело.</h2>
            <ul className="space-y-3 text-lg opacity-80">
              <li>• С первого раза, как мы встретились в клубе, мне было приятно с тобой общаться</li>
              <li>• ты мне очень приятен и комфортен даже хотя мы мало виделись </li>
              <li>• Ты классный, милый и очень приятный парень </li>
              <li>• С тобой мне как то более спокойно и приятно проводить время </li>
            </ul>
          </div>
          <img src="/img1.png" className="w-72 h-72 object-cover rounded-3xl shadow-2xl mt-10 md:mt-0" />
        </section>
      </AnimatedSection>

      {/* SECTION 2 */}
      <AnimatedSection>
        <section className="flex flex-col md:flex-row-reverse items-center justify-between p-10 min-h-[75vh] bg-white/5 shadow-xl">
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold mb-4">Почему ты важен для меня</h2>
            <p className="text-lg opacity-80">
              Ты важен для меня не потому что ты что-то делаешь — а потому что ты просто есть. Ты классный, стильный, милый, и у тебя своя особенная энергетика, которая притягивает. Ты правда делаешь мою жизнь немного лучше, даже просто своим существованием.
            </p>
          </div>
          <img src="/img2.png" className="w-72 h-72 object-cover rounded-3xl shadow-2xl mt-10 md:mt-0" />
        </section>
      </AnimatedSection>

      {/* SECTION 3 */}
      <AnimatedSection>
        <section className="flex flex-col items-center justify-center text-center p-10 min-h-[75vh] bg-gray-100/5 shadow-lg">
          <h2 className="text-4xl font-semibold mb-6">Мои слова для тебя</h2>
          <p className="text-xl max-w-2xl opacity-80">
            Броу, ты мне ничем не обязан и ничего не должен. Я помогаю тебе финансово не ожидая ничего взамен — я делаю это потому, что ты мне реально нравишься. Мне приятно заботиться о тебе и делать для тебя хоть что-то. Хочу, чтобы ты скорее восстановился, чувствовал себя спокойно, уверенно и не переживал ни о чём лишнем.
          </p>
        </section>
      </AnimatedSection>

      {/* END */}
      <AnimatedSection>
        <section className="flex flex-col items-center justify-center text-center p-10 min-h-[60vh] bg-white/5 shadow-xl">
          <h2 className="text-3xl font-semibold mb-4">Я рядом ❤️</h2>
          <p className="text-lg opacity-70 max-w-xl">
            Эта страница просто чтобы напомнить тебе: мне важно, чтобы ты был в порядке. Мне приятно помогать тебе и делать что-то для тебя. Ты ни в чём не обязан — просто будь собой, броу.
          </p>
        </section>
      </AnimatedSection>

    </main>
  );
}
