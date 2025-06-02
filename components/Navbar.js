import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-navy shadow-lg">
      <div className="text-2xl font-bold text-white tracking-wide">
        Cognitron
      </div>
      <div className="flex gap-8 text-white font-medium">
        <Link href="/" className="hover:text-blue-400">Home</Link>
        <Link href="/services" className="hover:text-blue-400">Services</Link>
        <Link href="/portfolio" className="hover:text-blue-400">Portfolio</Link>
        <Link href="/about" className="hover:text-blue-400">About</Link>
        <Link href="/contact" className="hover:text-blue-400">Contact</Link>
      </div>
    </nav>
  );
}