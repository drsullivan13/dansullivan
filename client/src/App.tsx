import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Recipes = lazy(() => import("@/pages/Recipes"));
const RecipeDetail = lazy(() => import("@/pages/RecipeDetail"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-primary font-game text-sm animate-pulse">LOADING\u2026</div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/projects" component={Projects}/>
        <Route path="/projects/:id" component={ProjectDetail}/>
        <Route path="/blog" component={Blog}/>
        <Route path="/blog/:id" component={BlogPost}/>
        <Route path="/recipes" component={Recipes}/>
        <Route path="/recipes/:id" component={RecipeDetail}/>
        <Route path="/about" component={About}/>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
