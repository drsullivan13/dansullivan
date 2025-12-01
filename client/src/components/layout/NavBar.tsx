import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [location] = useLocation();

  const links = [
    { href: "/projects", label: "PROJECTS" },
    { href: "/blog", label: "BLOG" },
    { href: "/recipes", label: "RECIPES" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <nav className="flex items-center justify-between mb-12 border-b border-border pb-4">
      <Link href="/">
        <span className="font-game text-primary cursor-pointer hover:text-primary/80 text-xs sm:text-sm">
          ← MISSION CONTROL
        </span>
      </Link>
      
      <div className="flex gap-4 sm:gap-8">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <span 
              className={cn(
                "font-hud font-bold text-sm sm:text-base cursor-pointer transition-colors hover:text-primary",
                location === link.href ? "text-primary text-glow" : "text-muted-foreground"
              )}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
