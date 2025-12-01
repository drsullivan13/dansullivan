import { NavBar } from "@/components/layout/NavBar";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      <h1 className="text-4xl font-game text-primary mb-8 text-glow animate-in slide-in-from-bottom-4 fade-in duration-700">PROJECTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-border bg-card p-6 rounded-lg hover:border-primary transition-colors group animate-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="h-48 bg-muted rounded mb-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-game text-4xl">?</div>
            </div>
            <h3 className="text-xl font-hud font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Project Alpha {i}</h3>
            <p className="text-muted-foreground">A revolutionary interface for digital interaction. Built with React and WebGL.</p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs border border-primary/30 rounded px-2 py-1 text-primary/70">React</span>
              <span className="text-xs border border-primary/30 rounded px-2 py-1 text-primary/70">Canvas</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
