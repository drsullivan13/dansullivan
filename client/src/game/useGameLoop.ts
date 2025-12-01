import { useEffect, useRef, useState, useCallback } from "react";
import { GameState, Projectile, Particle, Target } from "./types";
import { GAME_CONFIG, INITIAL_TARGETS } from "./constants";
import { useLocation } from "wouter";

export function useGameLoop(width: number, height: number) {
  const [_, setLocation] = useLocation();
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  
  // Game State Refs for performance (avoiding re-renders for 60fps loop)
  const shipXRef = useRef(50); // %
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  
  // Targets state needs to be reactive for UI updates, but we also need a ref for the loop
  const [targets, setTargets] = useState<Target[]>([]);
  const targetsRef = useRef<Target[]>([]);

  const cooldownRef = useRef(0);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Initialize Targets based on screen width
  useEffect(() => {
    if (width === 0) return;

    const totalWidth = Math.min(width, 1200); // Max width for targets container
    const startX = (width - totalWidth) / 2;
    const spacing = totalWidth / 4;

    const newTargets = INITIAL_TARGETS.map((t, i) => ({
      ...t,
      width: GAME_CONFIG.TARGET_WIDTH,
      height: GAME_CONFIG.TARGET_HEIGHT,
      x: startX + (spacing * i) + (spacing / 2) - (GAME_CONFIG.TARGET_WIDTH / 2),
      y: 100, // Fixed top offset
    }));

    setTargets(newTargets);
    targetsRef.current = newTargets;
  }, [width]);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const spawnParticles = (x: number, y: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        id: Math.random(),
        x,
        y,
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
        life: 1.0,
        color,
        size: Math.random() * 4 + 2,
      });
    }
  };

  const fireProjectile = () => {
    if (cooldownRef.current > 0) return;
    
    const x = (shipXRef.current / 100) * width;
    const y = height - GAME_CONFIG.SHIP_HEIGHT - 20;

    projectilesRef.current.push({
      id: Date.now(),
      x,
      y,
      width: 4,
      height: 12,
      dx: 0,
      dy: -GAME_CONFIG.PROJECTILE_SPEED,
      active: true,
    });

    cooldownRef.current = GAME_CONFIG.FIRE_COOLDOWN;
  };

  const update = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    // const deltaTime = time - lastTimeRef.current; // Use for time-based movement if needed
    lastTimeRef.current = time;

    // 1. Update Ship
    if (keysPressed.current["ArrowLeft"] || keysPressed.current["KeyA"]) {
      shipXRef.current = Math.max(2, shipXRef.current - GAME_CONFIG.SHIP_SPEED);
    }
    if (keysPressed.current["ArrowRight"] || keysPressed.current["KeyD"]) {
      shipXRef.current = Math.min(98, shipXRef.current + GAME_CONFIG.SHIP_SPEED);
    }
    if (keysPressed.current["Space"]) {
      fireProjectile();
    }

    if (cooldownRef.current > 0) cooldownRef.current--;

    // 2. Update Projectiles
    projectilesRef.current.forEach(p => {
      p.y += p.dy;
      if (p.y < -20) p.active = false;
    });

    // 3. Collision Detection
    let targetsChanged = false;
    
    projectilesRef.current.forEach(p => {
      if (!p.active) return;

      targetsRef.current.forEach(t => {
        if (t.hp <= 0) return;

        // Simple AABB collision
        if (
          p.x > t.x &&
          p.x < t.x + t.width &&
          p.y > t.y &&
          p.y < t.y + t.height
        ) {
          p.active = false;
          t.hp -= 1;
          targetsChanged = true;
          spawnParticles(p.x, p.y, t.color, 5);
          setScore(s => s + 10);

          if (t.hp <= 0) {
            spawnParticles(t.x + t.width/2, t.y + t.height/2, t.color, 50);
            setScore(s => s + 500);
            setTimeout(() => setLocation(t.route), 1000); // Delay for explosion
          }
        }
      });
    });

    projectilesRef.current = projectilesRef.current.filter(p => p.active);

    // 4. Update Particles
    particlesRef.current.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.life -= 0.02;
    });
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    // Sync React State for targets only if changed
    if (targetsChanged) {
      setTargets([...targetsRef.current]);
    }

    requestRef.current = requestAnimationFrame(update);
  }, [width, height, setLocation]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [update]);

  return {
    shipX: shipXRef.current,
    projectiles: projectilesRef.current,
    particles: particlesRef.current,
    targets,
    score,
    setShipX: (x: number) => { shipXRef.current = x; }
  };
}
