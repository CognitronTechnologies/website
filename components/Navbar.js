export default function Navbar() {
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-navy shadow-lg">
      <div className="text-2xl font-bold text-white tracking-wide">
        Cognitron Technologies
      </div>
      <div className="flex gap-8 text-white font-medium">
        <a href="/" className="hover:text-blue-400">Home</a>
        <a href="/services" className="hover:text-blue-400">Services</a>
        <a href="/portfolio" className="hover:text-blue-400">Portfolio</a>
        <a href="/about" className="hover:text-blue-400">About</a>
        <a href="/contact" className="hover:text-blue-400">Contact</a>
      </div>
    </nav>
  );
}