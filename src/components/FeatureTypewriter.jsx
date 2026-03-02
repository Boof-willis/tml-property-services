import { useState, useEffect, useRef } from 'react';

export default function FeatureTypewriter() {
  const words = ["Commercial Offices", "Residential Homes", "Move-In / Move-Out", "Post-Construction"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setText(prev => 
          isDeleting 
            ? currentWord.substring(0, prev.length - 1) 
            : currentWord.substring(0, prev.length + 1)
        );
      }
    }, typeSpeed);
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="text-center px-4 w-full">
      <span className="text-sm uppercase tracking-widest text-secondary font-mono block mb-2">We clean:</span>
      <div className="h-10 flex items-center justify-center">
        <span className="text-xl md:text-2xl font-heading text-primary">{text}</span>
        <span className="w-0.5 h-6 bg-accent ml-1 animate-pulse"></span>
      </div>
    </div>
  );
}