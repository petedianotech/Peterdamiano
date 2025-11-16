export function AnimatedShapes() {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] h-32 w-32 rounded-full bg-electric-blue/10 animate-float opacity-50" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[60%] left-[5%] h-24 w-24 rounded-2xl bg-coral-orange/10 animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[25%] right-[10%] h-40 w-40 rounded-full bg-deep-navy/5 animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-[10%] right-[20%] h-20 w-20 rounded-lg bg-electric-blue/10 animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[5%] left-[40%] h-16 w-16 rounded-full bg-coral-orange/5 animate-float opacity-50" style={{ animationDelay: '3s' }}></div>
      </div>
    );
  }
  