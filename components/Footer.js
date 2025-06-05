export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80 py-6 px-4 text-center mt-16 text-sm sm:text-base">
      &copy; {new Date().getFullYear()} Cognitron. All rights reserved.
      <div className="mt-2 text-xs sm:text-sm flex flex-col sm:flex-row gap-1 sm:gap-4 items-center justify-center">
        <span>Email: hello@cognitron.com</span> <span className="hidden sm:inline">&bull;</span> <span>Phone: +1 234 567 8901</span>
      </div>
    </footer>
  )
}