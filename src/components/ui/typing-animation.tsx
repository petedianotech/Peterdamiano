'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const roles = ['Innovator', 'Developer', 'Content Creator', 'Author'];

const TypingAnimation = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2000); // Change role every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xl md:text-2xl font-medium text-muted-foreground mb-6 flex items-center gap-x-2.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[roleIndex]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-accent font-semibold"
        >
          {roles[roleIndex]}
        </motion.span>
      </AnimatePresence>
      
      {roles.map((role, index) => (
         index > 0 && (
            <>
                <span className="text-muted-foreground/50">•</span>
                <span className={cn(
                    "transition-colors",
                    roleIndex === index ? "text-accent font-semibold" : "text-muted-foreground"
                )}>
                    {role}
                </span>
            </>
         )
      )).slice(1)}
    </div>
  );
};

export default TypingAnimation;
