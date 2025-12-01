import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";
import { getProjects, getProject, getBlogPosts, getBlogPost, getRecipes, getRecipe } from "./data/content";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Serve static files from content/media folder
  const mediaPath = path.join(process.cwd(), "content", "media");
  app.use("/content/media", express.static(mediaPath));

  // Projects API
  app.get("/api/projects", (req, res) => {
    const projects = getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", (req, res) => {
    const project = getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  // Blog API
  app.get("/api/blog", (req, res) => {
    const posts = getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/:id", (req, res) => {
    const post = getBlogPost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  });

  // Recipes API
  app.get("/api/recipes", (req, res) => {
    const recipes = getRecipes();
    res.json(recipes);
  });

  app.get("/api/recipes/:id", (req, res) => {
    const recipe = getRecipe(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  });

  return httpServer;
}
