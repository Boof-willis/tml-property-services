import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FeatureScheduler() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(cursorRef.current, { x: 40, y: 20, duration: 1, ease: "power2.inOut" })
        .to('.day-cell-3', { backgroundColor: '#3A7D7E', color: 'white', duration: 0.2 })
        .to(cursorRef.current, { x: -30, y: 60, duration: 1.2, ease: "power2.inOut", delay: 0.5 })
        .to('.day-cell-8', { backgroundColor: '#1B2A4A', color: 'white', duration: 0.2 })
        .to(cursorRef.current, { x: 50, y: -20, duration: 1, ease: "power2.inOut", delay: 1 })
        .to('.day-cell-3', { backgroundColor: '#FAF8F5', color: '#2B2B2B', duration: 0.2 })
        .to('.day-cell-8', { backgroundColor: '#FAF8F5', color: '#2B2B2B', duration: 0.2 })
        .to(cursorRef.current, { x: 0, y: 0, duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full max-w-[200px]">
      <div className="grid grid-cols-4 gap-2 text-xs font-mono text-center">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'].map((day, i) => (
          <div key={i} className={`day-cell-${i + 1} bg-background text-dark/50 py-2 rounded-sm border border-primary/10 transition-colors`}>
            {day}
          </div>
        ))}
      </div>
      <div 
        ref={cursorRef} 
        className="absolute top-4 left-10 w-4 h-4 z-10"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="#2B2B2B" strokeWidth="1">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
      </div>
    </div>
  );
}