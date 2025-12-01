import { Code, BookOpen, Utensils, User } from "lucide-react";
import { Target } from "./types";

export const GAME_CONFIG = {
  SHIP_SPEED: 0.8, // % per frame
  PROJECTILE_SPEED: 15, // px per frame
  FIRE_COOLDOWN: 15, // frames
  SHIP_WIDTH: 64,
  SHIP_HEIGHT: 64,
  TARGET_WIDTH: 200,
  TARGET_HEIGHT: 100,
};

// Colors must be valid for both CSS and Canvas (Hex/HSL/RGB)
// var(...) does not work in Canvas fillStyle
export const INITIAL_TARGETS: Omit<Target, "x" | "y" | "width" | "height">[] = [
  {
    id: "projects",
    label: "PROJECTS",
    route: "/projects",
    hp: 12,
    maxHp: 12,
    color: "#00ffff", // Neon Cyan
    icon: Code,
  },
  {
    id: "blog",
    label: "BLOG",
    route: "/blog",
    hp: 8,
    maxHp: 8,
    color: "#c026d3", // Neon Purple
    icon: BookOpen,
  },
  {
    id: "recipes",
    label: "RECIPES",
    route: "/recipes",
    hp: 5,
    maxHp: 5,
    color: "#db2777", // Neon Pink
    icon: Utensils,
  },
  {
    id: "about",
    label: "ABOUT",
    route: "/about",
    hp: 1,
    maxHp: 1,
    color: "#ffffff",
    icon: User,
  },
];
