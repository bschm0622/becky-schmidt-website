"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "home", href: "#top" },
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "resume", href: "#resume" },
  { label: "favorites", href: "#favorites" },
  { label: "connect", href: "#connect" },
];

export function FloatingNavbar() {
  const [activeItem, setActiveItem] = useState<string>("#top");
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll to update active section and navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section during programmatic scrolling
      if (isScrolling) return;
      
      // Add shadow when scrolled down
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href);
      
      // Special case for top of page
      if (window.scrollY < 100) {
        setActiveItem("#top");
        return;
      }
      
      // Find the current section in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === "#top") continue;
        
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section in view when its top is within the top half of the viewport
          if (rect.top <= window.innerHeight / 2) {
            setActiveItem(section);
            break;
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [isScrolling]);

  const scrollToSection = (href: string) => {
    setIsScrolling(true);
    setActiveItem(href);
    setMobileMenuOpen(false); // Close mobile menu when navigating
    
    // Special case for top of page
    if (href === "#top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setTimeout(() => setIsScrolling(false), 1000);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      // Calculate position to scroll to (accounting for navbar)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Reset isScrolling after animation completes
      setTimeout(() => setIsScrolling(false), 1000);
    } else {
      setIsScrolling(false);
    }
  };

  // Hamburger menu button component
  const HamburgerButton = () => (
    <button 
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileMenuOpen}
      aria-controls="mobile-menu"
    >
      <div className="relative w-6 h-5 flex items-center justify-center">
        <span className={cn(
          "absolute block h-0.5 w-6 bg-current transition-all duration-300 rounded-full",
          mobileMenuOpen ? "rotate-45" : "translate-y-[-6px]"
        )} />
        <span className={cn(
          "absolute block h-0.5 bg-current transition-all duration-300 rounded-full",
          mobileMenuOpen ? "opacity-0 w-0" : "opacity-100 w-5"
        )} />
        <span className={cn(
          "absolute block h-0.5 w-6 bg-current transition-all duration-300 rounded-full",
          mobileMenuOpen ? "-rotate-45" : "translate-y-[6px]"
        )} />
      </div>
    </button>
  );

  // Desktop navigation with adjusted spacing
  const DesktopNav = () => (
    <ul className="hidden md:flex items-center space-x-1 mx-auto">
      {navItems.map((item) => (
        <li key={item.href}>
          <button
            onClick={() => scrollToSection(item.href)}
            className={cn(
              "relative px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 flex items-center justify-center",
              activeItem === item.href
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeItem === item.href && (
              <motion.span
                layoutId="activeSection"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className={cn(
              "relative z-10",
              activeItem === item.href ? "text-primary-foreground" : ""
            )}>
              {item.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  // Mobile menu
  const MobileMenu = () => (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-md overflow-hidden md:hidden"
        >
          <ul className="py-1 flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="w-full">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 block",
                    activeItem === item.href
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={cn(
          "flex items-center w-auto px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md pointer-events-auto",
          "border border-border transition-all duration-300 relative",
          scrolled ? "shadow-sm" : ""
        )}
      >
        {/* Logo or brand name could go here */}
        <div className="text-sm font-semibold md:hidden">Portfolio</div>
        
        {/* Desktop navigation */}
        <DesktopNav />
        
        {/* Mobile hamburger button */}
        <div className="md:hidden ml-auto h-10 flex items-center justify-center">
          <HamburgerButton />
        </div>
        
        {/* Mobile menu dropdown */}
        <MobileMenu />
      </motion.nav>
    </div>
  );
}
