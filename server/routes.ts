import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { projects, blogPosts, recipes } from "./data/content";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects API
  app.get("/api/projects", (req, res) => {
    res.json(projects);
  });

  app.get("/api/projects/:id", (req, res) => {
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  // Blog API
  app.get("/api/blog", (req, res) => {
    res.json(blogPosts);
  });

  app.get("/api/blog/:id", (req, res) => {
    const post = blogPosts.find(p => p.id === req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  });

  // Recipes API
  app.get("/api/recipes", (req, res) => {
    res.json(recipes);
  });

  app.get("/api/recipes/:id", (req, res) => {
    const recipe = recipes.find(r => r.id === req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  });

  return httpServer;
}
