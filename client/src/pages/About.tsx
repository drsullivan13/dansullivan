import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
        <div className="w-32 h-32 rounded-full bg-white/10 mb-8 overflow-hidden border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <img src="/content/media/profile.png" alt="Dan Sullivan" className="w-full h-full object-cover"/>
        </div>
        
        <h1 className="text-5xl font-game text-white mb-6 text-glow">Dan Sullivan</h1>
        <p className="text-xl font-hud text-muted-foreground max-w-xl leading-relaxed mb-8">
          I'm a software engineer who enjoys learning new technologies and building things.
          This site contains a collection of my interests ranging from coding to cooking and everything in between.
        </p>
        
        <div className="flex gap-4">
          <Button asChild className="font-game text-xs bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform">
            <a href="mailto:drsulivan13@gmail.com">CONTACT</a>
          </Button>
          <Button asChild variant="outline" className="font-game text-xs hover:bg-white/10 hover:scale-105 transition-transform">
            <a href="https://github.com/drsullivan13" target="_blank" rel="noopener noreferrer">GITHUB</a>
          </Button>
          <Button asChild variant="outline" className="font-game text-xs hover:bg-white/10 hover:scale-105 transition-transform">
            <a href="https://twitter.com/dansullivan_" target="_blank" rel="noopener noreferrer">X</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
