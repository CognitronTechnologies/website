import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="w-full py-4 px-4 md:px-8 flex items-center bg-navy shadow-lg relative z-20">
      <div className="text-2xl font-bold text-white tracking-wide flex-1">
        Cognitron
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 text-white font-medium">
        <Link href="/" className="hover:text-blue-400">Home</Link>
        <Link href="/services" className="hover:text-blue-400">Services</Link>
        <Link href="/portfolio" className="hover:text-blue-400">Portfolio</Link>
        <Link href="/about" className="hover:text-blue-400">About</Link>
        <Link href="/contact" className="hover:text-blue-400">Contact</Link>
      </div>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center text-white focus:outline-none ml-2"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>
      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-navy border-t border-blue-900 flex flex-col md:hidden shadow-lg animate-fade-in">
          <Link href="/" className="py-3 px-6 border-b border-blue-900 hover:text-blue-400" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/services" className="py-3 px-6 border-b border-blue-900 hover:text-blue-400" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/portfolio" className="py-3 px-6 border-b border-blue-900 hover:text-blue-400" onClick={() => setOpen(false)}>Portfolio</Link>
          <Link href="/about" className="py-3 px-6 border-b border-blue-900 hover:text-blue-400" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" className="py-3 px-6 hover:text-blue-400" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}