import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { useBlogPost } from "@/lib/api";

export default function BlogPost() {
  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const { data: post, isLoading, error } = useBlogPost(id);

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      
      <article className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700">
        <Link href="/blog" className="inline-block mb-8 font-game text-xs text-muted-foreground hover:text-secondary transition-colors">
          ← RETURN TO FEED
        </Link>

        {isLoading && (
          <div className="text-center text-secondary font-game text-sm animate-pulse mt-20">
            LOADING TRANSMISSION\u2026
          </div>
        )}

        {error && (
          <div className="text-center text-destructive font-game text-sm mt-20">
            ERROR: {error.message}
          </div>
        )}

        {post && (
          <>
            <header className="mb-12 border-b border-border pb-8">
              <div className="flex items-center gap-4 text-secondary font-mono text-sm mb-4">
                <span className="bg-secondary/10 px-2 py-1 rounded">TRANSMISSION</span>
                <span>{post.date}</span>
                <span>{post.readTime} READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-hud font-bold text-white leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.subtitle}
              </p>
            </header>

            <div 
              className="mission-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                END OF TRANSMISSION
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="font-game text-xs" data-testid="button-share">
                  SHARE
                </Button>
                <Button variant="outline" size="sm" className="font-game text-xs" data-testid="button-save">
                  SAVE
                </Button>
              </div>
            </div>
          </>
        )}
      </article>
    </div>
  );
}
