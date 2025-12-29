import { Link } from "wouter";
import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Motorcycle", href: "#motorcycle" },
    { name: "Scooty", href: "#scooty" },
    { name: "Technology", href: "#technology" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white group-hover:shadow-[0_0_20px_hsla(160,84%,39%,0.5)] transition-shadow">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter">
              11th<span className="text-primary">One</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#waitlist"
              className="px-6 py-2.5 rounded-full font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_hsla(160,84%,39%,0.4)] transition-all"
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-xl font-bold bg-primary text-primary-foreground"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
