import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FeatureShuffler() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.shuffle-card');
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(cards[0], { y: -20, opacity: 0, scale: 0.9, duration: 0.5, delay: 2 })
        .to(cards[1], { y: 0, opacity: 1, scale: 1, duration: 0.5 }, "<")
        
        .to(cards[1], { y: -20, opacity: 0, scale: 0.9, duration: 0.5, delay: 2 })
        .to(cards[2], { y: 0, opacity: 1, scale: 1, duration: 0.5 }, "<")
        
        .to(cards[2], { y: -20, opacity: 0, scale: 0.9, duration: 0.5, delay: 2 })
        .to(cards[0], { y: 0, opacity: 1, scale: 1, duration: 0.5 }, "<")
        .set(cards[1], { y: 20 })
        .set(cards[2], { y: 20 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <div className="shuffle-card absolute w-3/4 bg-white p-4 rounded-md shadow-md text-center border-t-2 border-accent" style={{ transform: 'translateY(0) scale(1)', opacity: 1 }}>
        <span className="text-xs font-mono text-primary font-bold">WEEK 1</span>
        <div className="h-1 w-12 bg-light mx-auto mt-2 rounded"></div>
      </div>
      
      <div className="shuffle-card absolute w-3/4 bg-white p-4 rounded-md shadow-md text-center border-t-2 border-accent" style={{ transform: 'translateY(20px) scale(0.9)', opacity: 0 }}>
        <span className="text-xs font-mono text-primary font-bold">WEEK 2</span>
        <div className="h-1 w-16 bg-light mx-auto mt-2 rounded"></div>
      </div>
      
      <div className="shuffle-card absolute w-3/4 bg-white p-4 rounded-md shadow-md text-center border-t-2 border-accent" style={{ transform: 'translateY(20px) scale(0.9)', opacity: 0 }}>
        <span className="text-xs font-mono text-primary font-bold">PERFECTED</span>
        <div className="h-1 w-full bg-light mt-2 rounded flex justify-center"><div className="h-1 w-8 bg-secondary rounded"></div></div>
      </div>
    </div>
  );
}