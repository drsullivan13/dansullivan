import { NavBar } from "@/components/layout/NavBar";
import { Link } from "wouter";
import { useBlogPosts } from "@/lib/api";

export default function Blog() {
  const { data: posts, isLoading, error } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      <h1 className="text-4xl font-game text-secondary mb-8 text-glow animate-in slide-in-from-bottom-4 fade-in duration-700">
        TRANSMISSIONS
      </h1>
      
      {isLoading && (
        <div className="text-center text-secondary font-game text-sm animate-pulse">
          LOADING TRANSMISSIONS\u2026
        </div>
      )}
      
      {error && (
        <div className="text-center text-destructive font-game text-sm">
          ERROR: {error.message}
        </div>
      )}
      
      {posts && (
        <div className="space-y-8 max-w-3xl mx-auto">
          {posts.map((post, i) => (
            <article 
              key={post.id} 
              className="border-b border-border pb-8 animate-in slide-in-from-left-4 fade-in duration-500" 
              style={{ animationDelay: `${i * 150}ms` }}
              data-testid={`article-blog-${post.id}`}
            >
              <div className="text-sm text-secondary font-mono mb-2">
                STARDATE {post.date} • {post.readTime}
              </div>
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-hud font-bold mb-4 hover:text-secondary transition-colors cursor-pointer">
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.id}`} className="mt-4 inline-block text-secondary text-sm font-bold hover:underline" data-testid={`button-read-${post.id}`}>
                READ DATA STREAM →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
