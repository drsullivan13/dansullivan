import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  role: string;
  timeframe: string;
  architecture: string;
  preview?: string;
  demoUrl?: string;
  projectLink?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  tags: string[];
  ingredients: string[];
  content: string;
  emoji: string;
}

const contentDir = path.join(process.cwd(), "content");

function slugify(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function getExcerpt(content: string, maxLength: number = 200): string {
  const plainText = content
    .replace(/#+\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/>/g, "")
    .replace(/\n/g, " ")
    .trim();
  
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  
  if (!fs.existsSync(projectsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith(".md"));
  
  return files.map(filename => {
    const filePath = path.join(projectsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    
    return {
      id: slugify(filename),
      title: data.title || "Untitled Project",
      description: data.description || "",
      content: marked(content) as string,
      technologies: data.technologies || [],
      role: data.role || "",
      timeframe: data.timeframe || "",
      architecture: data.architecture || "",
      preview: data.preview,
      demoUrl: data.demoUrl,
      projectLink: data.projectLink
    };
  });
}

export function getProject(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.id === id);
}

export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDir, "blog");
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".md"));
  
  const posts = files.map(filename => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    
    return {
      id: slugify(filename),
      title: data.title || "Untitled Post",
      subtitle: data.subtitle || "",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      readTime: data.readTime || "5 min",
      excerpt: getExcerpt(content),
      content: marked(content) as string,
      tags: data.tags || []
    };
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(id: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(p => p.id === id);
}

export function getRecipes(): Recipe[] {
  const recipesDir = path.join(contentDir, "recipes");
  
  if (!fs.existsSync(recipesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(recipesDir).filter(f => f.endsWith(".md"));
  
  return files.map(filename => {
    const filePath = path.join(recipesDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    
    return {
      id: slugify(filename),
      title: data.title || "Untitled Recipe",
      description: data.description || "",
      prepTime: data.prepTime || "",
      cookTime: data.cookTime || "",
      totalTime: data.totalTime || "",
      tags: data.tags || [],
      ingredients: data.ingredients || [],
      content: marked(content) as string,
      emoji: data.emoji || "🍽️"
    };
  });
}

export function getRecipe(id: string): Recipe | undefined {
  const recipes = getRecipes();
  return recipes.find(r => r.id === id);
}

export const projects = getProjects();
export const blogPosts = getBlogPosts();
export const recipes = getRecipes();
