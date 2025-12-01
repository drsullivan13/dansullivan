import React, { useEffect, useRef, useState } from "react";
import { useGameLoop } from "../../game/useGameLoop";
import { GAME_CONFIG } from "../../game/constants";
import shipImageSrc from "@assets/generated_images/retro_8-bit_pixel_art_spaceship.png";
import { cn } from "@/lib/utils";
import { Target } from "../../game/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { TutorialOverlay } from "./TutorialOverlay";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [_, setLocation] = useLocation();
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Stars Ref
  const starsRef = useRef<Star[]>([]);
  
  // Initialize dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      setDimensions({
        width: containerRef.current?.clientWidth || 0,
        height: containerRef.current?.clientHeight || 0
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initialize Stars
  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const stars: Star[] = [];
    const count = 100;
    
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 40 + 20, // Speed correlated with size? Maybe independent for parallax
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    starsRef.current = stars;
  }, [dimensions.width, dimensions.height]);

  const { shipX, projectiles, particles, targets, score, setShipX } = useGameLoop(dimensions.width, dimensions.height);
  const shipImgRef = useRef<HTMLImageElement>(null);

  // Load ship image
  useEffect(() => {
    const img = new Image();
    img.src = shipImageSrc;
    shipImgRef.current = img;
  }, []);

  // Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Update and Draw Stars
    ctx.fillStyle = "#ffffff";
    const deltaTime = 1/60; // Approx
    
    starsRef.current.forEach(star => {
      star.y += star.speed * deltaTime;
      if (star.y > dimensions.height) {
        star.y = 0;
        star.x = Math.random() * dimensions.width;
      }
      
      ctx.globalAlpha = star.opacity;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    ctx.globalAlpha = 1.0;

    // Draw Projectiles
    ctx.fillStyle = "#00ffff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ffff";
    projectiles.forEach(p => {
      ctx.fillRect(p.x - 2, p.y, p.width, p.height);
    });
    ctx.shadowBlur = 0;

    // Draw Particles
    particles.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Draw Ship
    const shipPixelX = (shipX / 100) * dimensions.width;
    const shipY = dimensions.height - GAME_CONFIG.SHIP_HEIGHT - 20;
    
    if (shipImgRef.current) {
      ctx.drawImage(
        shipImgRef.current, 
        shipPixelX - GAME_CONFIG.SHIP_WIDTH/2, 
        shipY, 
        GAME_CONFIG.SHIP_WIDTH, 
        GAME_CONFIG.SHIP_HEIGHT
      );
    } else {
      // Fallback
      ctx.fillStyle = "cyan";
      ctx.fillRect(shipPixelX - 20, shipY, 40, 40);
    }

  }, [shipX, projectiles, particles, dimensions]);

  const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
    // If tutorial is visible, don't move ship on click (let tutorial handle dismissal)
    if (showTutorial) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setShipX(percentage);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-background overflow-hidden select-none"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-10"
      />
      
      <TutorialOverlay onDismiss={() => setShowTutorial(false)} onSkip={() => setLocation('/projects')} />
      
      {/* UI Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* HUD */}
        <div className="absolute top-4 left-4 font-game text-primary text-xl animate-pulse z-30">
          SCORE: {score.toString().padStart(6, '0')}
        </div>

        <div className="absolute top-4 right-4 pointer-events-auto z-30">
          <Button 
            variant="outline" 
            className="font-game text-xs border-primary text-primary hover:bg-primary/20 bg-black/50 backdrop-blur-sm"
            onClick={() => setLocation('/projects')}
          >
            SKIP GAME →
          </Button>
        </div>

        {/* Targets */}
        {targets.map(target => (
          <TargetDisplay key={target.id} target={target} />
        ))}
      </div>
      
      {/* Controls Hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/30 font-hud text-sm pointer-events-none z-20">
        [← →] MOVE  [SPACE] SHOOT
      </div>
    </div>
  );
}

function TargetDisplay({ target }: { target: Target }) {
  if (target.hp <= 0) return null;

  return (
    <div 
      className="absolute flex flex-col items-center justify-center transition-transform duration-75"
      style={{
        left: target.x,
        top: target.y,
        width: target.width,
        height: target.height,
        animation: 'float 6s ease-in-out infinite',
        animationDelay: `${Math.random() * 2}s`
      }}
    >
      <div 
        className={cn(
          "w-full h-full rounded-xl border-2 flex flex-col items-center justify-center gap-2 bg-black/80 backdrop-blur-md p-4 transition-all duration-200 pointer-events-auto cursor-crosshair",
          "shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
        )}
        style={{ borderColor: target.color, boxShadow: `0 0 10px ${target.color}40` }}
      >
        <target.icon className="w-8 h-8" style={{ color: target.color }} />
        <span className="font-hud font-bold tracking-widest text-white">{target.label}</span>
        <Progress 
          value={(target.hp / target.maxHp) * 100} 
          className="h-2 w-full mt-2 bg-white/10" 
          indicatorClassName="transition-all duration-100"
          style={{ "--progress-background": target.color } as any} 
        />
      </div>
    </div>
  );
}
