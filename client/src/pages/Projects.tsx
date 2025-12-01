import { NavBar } from "@/components/layout/NavBar";
import { Link } from "wouter";
import { useProjects, getMediaType } from "@/lib/api";

function MediaPreview({ src, title }: { src?: string; title: string }) {
  if (!src) {
    return (
      <>
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-game text-4xl">
          ?
        </div>
      </>
    );
  }

  const mediaType = getMediaType(src);

  if (mediaType === 'video') {
    return (
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  return (
    <img
      src={src}
      alt={`${title} preview`}
      className="w-full h-full object-cover"
    />
  );
}

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects();

  return (
    <div className="min-h-screen bg-background p-8">
      <NavBar />
      <h1 className="text-4xl font-game text-primary mb-8 text-glow animate-in slide-in-from-bottom-4 fade-in duration-700">
        PROJECTS
      </h1>
      
      {isLoading && (
        <div className="text-center text-primary font-game text-sm animate-pulse">
          LOADING DATA...
        </div>
      )}
      
      {error && (
        <div className="text-center text-destructive font-game text-sm">
          ERROR: {error.message}
        </div>
      )}
      
      {projects && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <div 
                className="border border-border bg-card p-6 rounded-lg hover:border-primary transition-colors group animate-in zoom-in-95 duration-500 cursor-pointer" 
                style={{ animationDelay: `${i * 100}ms` }}
                data-testid={`card-project-${project.id}`}
              >
                <div className="h-48 bg-muted rounded mb-4 overflow-hidden relative">
                  <MediaPreview src={project.preview} title={project.title} />
                </div>
                <h3 className="text-xl font-hud font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {project.technologies.slice(0, 2).map(tech => (
                    <span key={tech} className="text-xs border border-primary/30 rounded px-2 py-1 text-primary/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
