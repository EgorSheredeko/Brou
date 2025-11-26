import AnimatedSection from "../components/AnimatedSection";

export default function Home() {
  return (
    <main
      className="relative w-full overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background-placeholder.jpg"
          alt="Background texture"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* HERO */}
      <AnimatedSection>
        <section
          className="flex flex-col items-center justify-center text-center p-8 shadow-xl"
          style={{ minHeight: "75vh", backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Скорейшего выздоровления, мой стильный и милый броу ❤️
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-70">
            Серьёзно переживаю за тебя, броу. Хочу, чтобы ты быстрее восстановился
            и чувствовал себя лучше. Мы ещё не встречаемся, но я правда надеюсь,
            что когда-нибудь мы будем ближе. Ты мне очень нравишься, и я хочу,
            чтобы ты это знал.
          </p>
        </section>
      </AnimatedSection>

      {/* SECTION 1 */}
      <AnimatedSection>
        <section
          className="flex flex-col md:flex-row items-center justify-between p-8 shadow-lg"
          style={{ minHeight: "75vh", backgroundColor: "rgba(247,247,247,0.03)" }}
        >
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Почему я так за тебя переживаю?
            </h2>
            <ul className="space-y-2 text-lg opacity-80">
              <li>• Ты мне очень понравился с первого раза как я тебя увидел</li>
              <li>• Ты мне приятен и комфортен даже хоть мы мало виделись</li>
              <li>• Ты классный, красивый и милый парень</li>
              <li>• С тобой мне спокойно и приятно проводить время</li>
            </ul>
          </div>
          <img
            src="/img1.png"
            className="w-64 h-64 object-cover rounded-3xl shadow-2xl mt-6 md:mt-0"
          />
        </section>
      </AnimatedSection>

      {/* SECTION 2 */}
      <AnimatedSection>
        <section
          className="flex flex-col md:flex-row-reverse items-center justify-between p-8 shadow-xl"
          style={{ minHeight: "75vh", backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Почему ты важен для меня
            </h2>
            <p className="text-lg opacity-80">
              Ты важен для меня не потому что что-то делаешь — а потому что ты просто
              есть. Ты классный, стильный, милый, и у тебя своя особенная энергетика,
              которая притягивает. Ты делаешь мою жизнь немного лучше просто своим существованием.
            </p>
          </div>
          <img
            src="/img2.png"
            className="w-64 h-64 object-cover rounded-3xl shadow-2xl mt-6 md:mt-0"
          />
        </section>
      </AnimatedSection>

      {/* SECTION 3 */}
      <AnimatedSection>
        <section
          className="flex flex-col items-center text-center justify-center p-8 shadow-lg"
          style={{ minHeight: "70vh", backgroundColor: "rgba(247,247,247,0.03)" }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Мои слова для тебя</h2>
          <p className="text-lg max-w-2xl opacity-80">
            Броу, ты мне ничем не обязан и ничего не должен. Я помогаю тебе финансово
            не ожидая ничего взамен — я делаю это потому, что ты мне реально нравишься.
            Мне приятно заботиться о тебе и делать что-то для тебя. Хочу, чтобы ты скорее
            восстановился, чувствовал себя спокойно, уверенно и не переживал ни о чём лишнем.
          </p>
        </section>
      </AnimatedSection>

      {/* END */}
      <AnimatedSection>
        <section
          className="flex flex-col items-center justify-center text-center p-8 shadow-xl"
          style={{ minHeight: "60vh", backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <h2 className="text-3xl font-semibold mb-4">Я рядом ❤️</h2>
          <p className="text-lg opacity-70 max-w-xl">
            Эта страница просто чтобы напомнить тебе: мне важно, чтобы ты был в порядке.
            Мне приятно помогать тебе и делать что-то для тебя. Ты ни в чём не обязан — просто будь собой, броу.
          </p>
        </section>
      </AnimatedSection>
    </main>
  );
}
