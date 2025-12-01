import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRoute, Link } from "wouter";

export default function RecipeDetail() {
  const [match, params] = useRoute("/recipes/:id");
  const id = params?.id;

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      
      <div className="max-w-4xl mx-auto animate-in zoom-in-95 fade-in duration-500">
        <Link href="/recipes">
          <Button variant="ghost" className="mb-6 font-game text-xs pl-0 text-muted-foreground hover:text-accent hover:bg-transparent">
            ← RETURN TO MESS HALL
          </Button>
        </Link>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-accent/10 p-8 md:p-12 border-b border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex gap-3 mb-6 font-mono text-xs text-accent tracking-widest uppercase">
                <span className="bg-background/50 px-3 py-1 rounded-full border border-accent/20">Class A Fuel</span>
                <span className="bg-background/50 px-3 py-1 rounded-full border border-accent/20">Vegan</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-game text-white mb-4 text-glow">
                SPACE CURRY {id}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl font-hud">
                High-efficiency caloric intake for long-haul missions. 
                Spicy enough to keep you alert during asteroid navigation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Ingredients */}
            <div className="p-8 md:col-span-1 bg-background/50">
              <h3 className="font-game text-sm text-accent mb-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"/>
                MIXTURE COMPONENTS
              </h3>
              <div className="space-y-4">
                {["Coconut Milk (400ml)", "Red Curry Paste (50g)", "Tofu Blocks (Firm)", "Bamboo Shoots", "Thai Basil", "Lime Leaves"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <Checkbox id={`ing-${i}`} className="border-accent/50 data-[state=checked]:bg-accent data-[state=checked]:text-white mt-1" />
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

            {/* Instructions */}
            <div className="p-8 md:col-span-2 bg-background">
              <h3 className="font-game text-sm text-accent mb-6">SYNTHESIS PROTOCOL</h3>
              <div className="space-y-8">
                {[
                  "Initialize heating sequence on Wok unit to 400°F.",
                  "Deploy curry paste into heated oil. Sauté until aromatic sensors detect peak fragrance (approx 2 min).",
                  "Slowly inject coconut milk while maintaining constant agitation to prevent separation.",
                  "Introduce solid matter (tofu, bamboo). Reduce thermal output to simmer state.",
                  "Execute simmer cycle for 15 minutes.",
                  "Terminate heat. Garnish with basil immediately before consumption."
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="font-game text-2xl text-accent/20 group-hover:text-accent transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-muted-foreground leading-relaxed pt-1 group-hover:text-foreground transition-colors">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
