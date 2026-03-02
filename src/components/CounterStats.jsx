import { useState, useEffect, useRef } from 'react';

export default function CounterStats({ target, suffix = '', fallback }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              setHasAnimated(true);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  if (!hasAnimated && count === 0) {
    return <div ref={ref} className="text-4xl md:text-5xl font-heading text-primary">{fallback}</div>;
  }

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-heading text-primary">
      {count}{suffix}
    </div>
  );
}