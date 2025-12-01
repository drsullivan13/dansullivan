import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Recipes from "@/pages/Recipes";
import RecipeDetail from "@/pages/RecipeDetail";
import About from "@/pages/About";

function Router() {
  return (
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
