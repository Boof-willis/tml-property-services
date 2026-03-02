import { useEffect } from 'react';
import gsap from 'gsap';

export default function HeroAnimations() {
  useEffect(() => {
    // Only run if elements exist
    const items = document.querySelectorAll('.hero-anim-item');
    if (!items.length) return;

    // Set initial state via GSAP (so it gracefully degrades if JS is off)
    gsap.set(items, { y: 40, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to('.hero-anim-item', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}