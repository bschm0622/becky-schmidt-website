"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function FloatingNavbar() {
  const [activeItem, setActiveItem] = useState<string>("#top");
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={cn(
          "flex items-center px-2 py-1.5 rounded-full bg-card/90 backdrop-blur-md pointer-events-auto",
          "border border-border transition-all duration-300",
          scrolled ? "shadow-lg" : ""
        )}
      >
        <ul className="flex space-x-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 flex items-center justify-center",
                  activeItem === item.href
                    ? "text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {activeItem === item.href && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 bg-accent rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className={cn(
                  "relative z-10",
                  activeItem === item.href ? "text-accent-foreground" : ""
                )}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}
