'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  "Hello, I'm Peter Damiano.",
  "I'm an Innovator.",
  "I'm an Author.",
  "I'm a Content Creator.",
  "I'm a Software Engineer.",
];

const TypingAnimation = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const typingSpeed = isDeleting ? 75 : 150;

    const handleTyping = () => {
      if (isDeleting) {
        if (text.length > 0) {
          setText((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        if (text.length < currentPhrase.length) {
          setText((prev) => currentPhrase.substring(0, prev.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-semibold mb-4 leading-tight tracking-tighter min-h-[100px] md:min-h-[120px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="inline-block w-1 h-8 md:h-12 bg-primary ml-1"
      >
        &nbsp;
      </motion.span>
    </h1>
  );
};

export default TypingAnimation;
