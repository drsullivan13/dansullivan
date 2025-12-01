import { NavBar } from "@/components/layout/NavBar";
import { Link } from "wouter";
import { useRecipes } from "@/lib/api";

export default function Recipes() {
  const { data: recipes, isLoading, error } = useRecipes();

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      <h1 className="text-4xl font-game text-accent mb-8 text-glow animate-in slide-in-from-bottom-4 fade-in duration-700">
        FUEL
      </h1>
      
      {isLoading && (
        <div className="text-center text-accent font-game text-sm animate-pulse">
          LOADING FUEL DATA...
        </div>
      )}
      
      {error && (
        <div className="text-center text-destructive font-game text-sm">
          ERROR: {error.message}
        </div>
      )}
      
      {recipes && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recipes.map((recipe, i) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div 
                className="bg-card border border-border p-6 rounded-xl flex gap-4 animate-in zoom-in-95 duration-500 hover:bg-accent/5 transition-colors cursor-pointer" 
                style={{ animationDelay: `${i * 100}ms` }}
                data-testid={`card-recipe-${recipe.id}`}
              >
                <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-4xl shrink-0">
                  {recipe.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-hud font-bold mb-2 text-foreground group-hover:text-accent">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{recipe.description}</p>
                  <div className="flex gap-2 text-xs font-mono text-accent flex-wrap">
                    <span className="bg-accent/10 px-2 py-1 rounded">{recipe.prepTime}</span>
                    {recipe.tags.map(tag => (
                      <span key={tag} className="bg-accent/10 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
