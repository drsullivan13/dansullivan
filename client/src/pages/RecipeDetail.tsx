import { NavBar } from "@/components/layout/NavBar";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams, Link } from "wouter";
import { useRecipe } from "@/lib/api";

export default function RecipeDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const { data: recipe, isLoading, error } = useRecipe(id);

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      
      <div className="max-w-4xl mx-auto animate-in zoom-in-95 fade-in duration-500">
        <Link href="/recipes" className="inline-block mb-6 font-game text-xs text-muted-foreground hover:text-accent transition-colors">
          ← RETURN TO MESS HALL
        </Link>

        {isLoading && (
          <div className="text-center text-accent font-game text-sm animate-pulse mt-20">
            LOADING RECIPE DATA\u2026
          </div>
        )}

        {error && (
          <div className="text-center text-destructive font-game text-sm mt-20">
            ERROR: {error.message}
          </div>
        )}

        {recipe && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-accent/10 p-8 md:p-12 border-b border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex gap-3 mb-6 font-mono text-xs text-accent tracking-widest uppercase flex-wrap">
                  {recipe.tags.map(tag => (
                    <span key={tag} className="bg-background/50 px-3 py-1 rounded-full border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-game text-white mb-4 text-glow">
                  {recipe.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl font-hud">
                  {recipe.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="p-8 md:col-span-1 bg-background/50">
                <h3 className="font-game text-sm text-accent mb-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"/>
                  MIXTURE COMPONENTS
                </h3>
                <div className="space-y-4">
                  {recipe.ingredients.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <Checkbox 
                        id={`ing-${i}`} 
                        className="border-accent/50 data-[state=checked]:bg-accent data-[state=checked]:text-white mt-1" 
                        data-testid={`checkbox-ingredient-${i}`}
                      />
                      <label 
                        htmlFor={`ing-${i}`}
                        className="text-sm text-muted-foreground font-mono leading-relaxed group-hover:text-foreground transition-colors cursor-pointer select-none"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 md:col-span-2 bg-background">
                <h3 className="font-game text-sm text-accent mb-6">SYNTHESIS PROTOCOL</h3>
                <div 
                  className="mission-prose"
                  dangerouslySetInnerHTML={{ __html: recipe.content }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
