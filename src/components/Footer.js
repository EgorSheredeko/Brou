export default function Footer() {
  return (
    <footer className="w-full bg-pink-50 text-pink-600 py-6 mt-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-lg mb-2">
          © {new Date().getFullYear()} Brou. All rights reserved.
        </p>
        <p className="text-md">
          Здесь ничего важного не написано, кроме того, что я тебя очень люблю, солнце мое 💖
        </p>
      </div>
    </footer>
  );
}
