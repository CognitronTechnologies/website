export default function Footer() {
  return (
    <footer className="w-full bg-navy-dark text-white py-6 flex flex-col items-center">
      <div className="mb-2">&copy; {new Date().getFullYear()} Cognitron. All rights reserved.</div>
      <div className="flex gap-4">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
        <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        cognitron.tech
      </div>
    </footer>
  );
}