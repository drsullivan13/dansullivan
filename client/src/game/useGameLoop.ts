import { useEffect, useRef, useState, useCallback } from "react";
import { GameState, Projectile, Particle, Target } from "./types";
import { GAME_CONFIG, INITIAL_TARGETS } from "./constants";
import { useLocation } from "wouter";

export function useGameLoop(width: number, height: number) {
  const [_, setLocation] = useLocation();
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  
  // Game State Refs (Mutable state for the game loop)
  const shipXRef = useRef(50); // %
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const targetsRef = useRef<Target[]>([]);
  const cooldownRef = useRef(0);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // We expose a ref to the latest React-managed targets so we can read them in the loop
  // BUT to avoid tearing, we probably should just keep targets in the ref and only sync to state for UI.
  // Let's stick to: Logic updates Refs -> Syncs to State if needed for DOM UI.
  const [targetsState, setTargetsState] = useState<Target[]>([]);

  // Initialize Targets
  useEffect(() => {
    if (width === 0) return;

    // Only initialize if empty or if width changed significantly? 
    // Actually, we should reset when width changes to re-center.
    const totalWidth = Math.min(width, 1200);
    const startX = (width - totalWidth) / 2;
    const spacing = totalWidth / 4;

    const newTargets = INITIAL_TARGETS.map((t, i) => ({
      ...t,
      width: GAME_CONFIG.TARGET_WIDTH,
      height: GAME_CONFIG.TARGET_HEIGHT,
      x: startX + (spacing * i) + (spacing / 2) - (GAME_CONFIG.TARGET_WIDTH / 2),
      y: 100,
    }));

    targetsRef.current = newTargets;
    setTargetsState(newTargets);
  }, [width]);

  // Input Listeners
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

  // The update loop - this is pure logic. 
  // It updates the Refs. It does NOT trigger React renders.
  const update = useCallback(() => {
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

    // 3. Collision
    let targetsChanged = false;
    projectilesRef.current.forEach(p => {
      if (!p.active) return;
      targetsRef.current.forEach(t => {
        if (t.hp <= 0) return;
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
            setTimeout(() => setLocation(t.route), 1000);
          }
        }
      });
    });

    projectilesRef.current = projectilesRef.current.filter(p => p.active);

    // 4. Particles
    particlesRef.current.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.life -= 0.02;
    });
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    // Sync Targets to React State if changed (for DOM UI)
    if (targetsChanged) {
      setTargetsState([...targetsRef.current]);
    }
  }, [width, height, setLocation]);

  const fire = useCallback(() => {
    fireProjectile();
  }, [width, height]);

  // We return the REFS so the canvas can read them directly in its own loop
  return {
    shipXRef,
    projectilesRef,
    particlesRef,
    targets: targetsState, // React State for DOM
    score,
    update, // The logic function
    setShipX: (x: number) => { shipXRef.current = x; },
    fire, // Expose fire method for mobile button
  };
}
