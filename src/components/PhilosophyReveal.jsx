import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophyReveal({ children }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Split text into words for animation
    const text = textRef.current.innerText;
    textRef.current.innerHTML = '';
    
    const words = text.split(' ').map((word, index, array) => {
      const span = document.createElement('span');
      // Add a non-breaking space after the word, unless it's the last word
      span.innerHTML = word + (index < array.length - 1 ? '&nbsp;' : '');
      span.style.opacity = '0.2';
      span.style.display = 'inline-block';
      textRef.current.appendChild(span);
      return span;
    });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Fallback to static text before JS runs
  return (
    <div ref={textRef}>
      {children}
    </div>
  );
}