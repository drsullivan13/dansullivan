import { NavBar } from "@/components/layout/NavBar";

export default function Recipes() {
  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      <h1 className="text-4xl font-game text-accent mb-8 text-glow animate-in slide-in-from-bottom-4 fade-in duration-700">FUEL</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-xl flex gap-4 animate-in zoom-in-95 duration-500 hover:bg-accent/5 transition-colors cursor-pointer" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-4xl shrink-0">
              {i % 2 === 0 ? '🍳' : '🍜'}
            </div>
            <div>
              <h3 className="text-xl font-hud font-bold mb-2 text-foreground group-hover:text-accent">Space Curry {i}</h3>
              <p className="text-sm text-muted-foreground mb-4">Spicy enough to warp speed. A blend of galactic spices.</p>
              <div className="flex gap-2 text-xs font-mono text-accent">
                <span className="bg-accent/10 px-2 py-1 rounded">20 MIN</span>
                <span className="bg-accent/10 px-2 py-1 rounded">VEGAN</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
