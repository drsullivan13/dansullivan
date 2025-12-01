import { NavBar } from "@/components/layout/NavBar";
import { Link } from "wouter";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      <h1 className="text-4xl font-game text-secondary mb-8 text-glow animate-in slide-in-from-bottom-4 fade-in duration-700">TRANSMISSIONS</h1>
      <div className="space-y-8 max-w-3xl mx-auto">
        {[1, 2, 3].map((i) => (
          <article key={i} className="border-b border-border pb-8 animate-in slide-in-from-left-4 fade-in duration-500" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="text-sm text-secondary font-mono mb-2">STARDATE 2024.10.{i}</div>
            <Link href={`/blog/${i}`}>
              <h2 className="text-2xl font-hud font-bold mb-4 hover:text-secondary transition-colors cursor-pointer">The Future of Interfaces</h2>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              The screen is not a flat surface. It is a window into a deep space of information. 
              We must design for depth, for motion, and for the joy of discovery.
              Minimalism is not about removing elements, but about removing friction.
            </p>
            <Link href={`/blog/${i}`}>
              <button className="mt-4 text-secondary text-sm font-bold hover:underline">READ DATA STREAM →</button>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
