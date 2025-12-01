import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { useRoute, Link } from "wouter";
import { useProject } from "@/lib/api";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  const id = params?.id || "";
  const { data: project, isLoading, error } = useProject(id);

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      
      <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700">
        <Link href="/projects">
          <Button variant="ghost" className="mb-6 font-game text-xs pl-0 hover:bg-transparent hover:text-primary">
            ← RETURN TO ARCHIVE
          </Button>
        </Link>

        {isLoading && (
          <div className="text-center text-primary font-game text-sm animate-pulse mt-20">
            LOADING PROJECT DATA...
          </div>
        )}

        {error && (
          <div className="text-center text-destructive font-game text-sm mt-20">
            ERROR: {error.message}
          </div>
        )}

        {project && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h1 className="text-5xl font-game text-primary text-glow leading-tight">
                {project.title}
              </h1>
              
              <div className="aspect-video bg-muted rounded-lg border border-border overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-game text-6xl text-primary/20">PREVIEW</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="font-hud text-2xl text-white mb-4">MISSION REPORT</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card border border-border p-6 rounded-xl space-y-6">
                <h3 className="font-game text-sm text-muted-foreground border-b border-border pb-2">
                  SYSTEM SPECS
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 font-mono">ARCHITECTURE</div>
                    <div className="font-hud font-bold text-lg">{project.architecture}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 font-mono">TIMEFRAME</div>
                    <div className="font-hud font-bold text-lg">{project.timeframe}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 font-mono">ROLE</div>
                    <div className="font-hud font-bold text-lg">{project.role}</div>
                  </div>
                </div>

                {project.demoUrl && (
                  <div className="pt-4">
                    <Button className="w-full font-game text-xs bg-primary text-black hover:bg-primary/90" data-testid="button-launch-demo">
                      LAUNCH DEMO
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                <h3 className="font-game text-sm text-primary mb-4">KEY TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs font-mono text-primary/80 border border-primary/30 px-2 py-1 rounded bg-primary/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
