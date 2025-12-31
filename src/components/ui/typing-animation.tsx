'use client';
import React from 'react';
import { cn } from '@/lib/utils';

const roles = ['Innovator', 'Developer', 'Content Creator', 'Author'];

const TypingAnimation = () => {
  return (
    <div className="text-xl md:text-2xl font-medium text-muted-foreground mb-6 flex flex-wrap items-center gap-x-2.5">
      <span className="text-accent font-semibold">{roles[0]}</span>
      {roles.slice(1).map((role) => (
        <React.Fragment key={role}>
          <span className="text-muted-foreground/50">•</span>
          <span className="text-muted-foreground">{role}</span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TypingAnimation;
