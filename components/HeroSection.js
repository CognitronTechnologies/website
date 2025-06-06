export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] bg-navy-dark text-white text-center px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4">
        Cognitron: <span className="text-blue-400">Empowering Innovation</span> in Tech
      </h1>
      <p className="text-base sm:text-lg md:text-2xl max-w-2xl mb-8 text-white/80">
        We help businesses accelerate their growth with expert software development, digital transformation, and innovative technology consulting.
      </p>
      <a href="/contact" className="inline-block w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-bold transition text-base sm:text-lg">
        Get Started
      </a>
    </section>
  );
}