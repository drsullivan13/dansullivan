export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Entity extends Position {
  width: number;
  height: number;
}

export interface Projectile extends Entity, Velocity {
  id: number;
  active: boolean;
}

export interface Particle extends Position, Velocity {
  id: number;
  life: number;
  color: string;
  size: number;
}

export interface Target {
  id: string;
  label: string;
  route: string;
  hp: number;
  maxHp: number;
  color: string;
  icon: any; // Lucide icon
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  width: number; // px
  height: number; // px
}

export interface GameState {
  shipX: number; // Percentage 0-100
  projectiles: Projectile[];
  particles: Particle[];
  targets: Target[];
  score: number;
  gameOver: boolean;
  level: string;
}
