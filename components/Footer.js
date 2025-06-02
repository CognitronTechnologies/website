export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80 py-6 px-4 text-center mt-16">
      &copy; {new Date().getFullYear()} Cognitron. All rights reserved.
      <div className="mt-2 text-xs">
        <span>Email: hello@cognitron.com</span> &bull; <span>Phone: +1 234 567 8901</span>
      </div>
    </footer>
  )
}