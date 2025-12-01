import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { useRoute, Link } from "wouter";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:id");
  const id = params?.id;

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      
      <article className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 font-game text-xs pl-0 text-muted-foreground hover:text-secondary hover:bg-transparent">
            ← RETURN TO FEED
          </Button>
        </Link>

        <header className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-4 text-secondary font-mono text-sm mb-4">
            <span className="bg-secondary/10 px-2 py-1 rounded">TRANSMISSION #{id}</span>
            <span>2024.10.24</span>
            <span>5 MIN READ</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-hud font-bold text-white leading-tight mb-6">
            The Future of Interfaces is Spatial
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Why we must move beyond the flat page and embrace depth, motion, and physics in web design.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6 font-sans leading-loose">
          <p>
            The screen has always been a lie. It pretends to be a flat piece of paper, 
            but it is a window into an infinite space. When we treat it like paper, 
            we constrain our thinking to margins and folds.
          </p>
          
          <h2 className="text-2xl font-hud font-bold text-white mt-12 mb-4">Breaking the Frame</h2>
          <p>
            In the arcade era, interfaces were unconstrained. They were playful, responsive, 
            and immersive. Then came the "corporate web" - grids, sidebars, and hero sections. 
            Efficient, yes. Boring? Absolutely.
          </p>

          <div className="my-12 border-l-4 border-secondary pl-6 italic text-xl text-secondary/80">
            "Magic happens when the interface dissolves, and only the interaction remains."
          </div>

          <p>
            We are now entering a new era. With the power of modern GPUs in every pocket, 
            we can afford to be wasteful with pixels if it means being respectful of attention.
            Motion is not decoration; it is information. Depth is not a gimmick; it is hierarchy.
          </p>

          <h2 className="text-2xl font-hud font-bold text-white mt-12 mb-4">The Protocol</h2>
          <p>
            1. Make it fast.<br/>
            2. Make it alive.<br/>
            3. Make it meaningful.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            END OF TRANSMISSION
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" className="font-game text-xs">SHARE</Button>
            <Button variant="outline" size="sm" className="font-game text-xs">SAVE</Button>
          </div>
        </div>
      </article>
    </div>
  );
}
