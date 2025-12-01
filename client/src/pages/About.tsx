import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
        <div className="w-32 h-32 rounded-full bg-white/10 mb-8 overflow-hidden border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <img src="https://github.com/shadcn.png" alt="Pilot" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
        
        <h1 className="text-5xl font-game text-white mb-6 text-glow">COMMANDER</h1>
        <p className="text-xl font-hud text-muted-foreground max-w-xl leading-relaxed mb-8">
          I build digital experiences that feel like magic. 
          Currently piloting the frontend architecture at Replit.
          Obsessed with performance, pixel perfection, and retro games.
        </p>
        
        <div className="flex gap-4">
          <Button className="font-game text-xs bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform">CONTACT</Button>
          <Button variant="outline" className="font-game text-xs hover:bg-white/10 hover:scale-105 transition-transform">GITHUB</Button>
          <Button variant="outline" className="font-game text-xs hover:bg-white/10 hover:scale-105 transition-transform">TWITTER</Button>
        </div>
      </div>
    </div>
  );
}
