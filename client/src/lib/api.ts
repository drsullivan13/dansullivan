import { useQuery } from "@tanstack/react-query";

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  role: string;
  timeframe: string;
  architecture: string;
  demoUrl?: string;
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
  tags: string[];
  ingredients: string[];
  instructions: string[];
  emoji: string;
}

async function fetchAPI<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchAPI<Project[]>("/api/projects"),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => fetchAPI<Project>(`/api/projects/${id}`),
    enabled: !!id,
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: () => fetchAPI<BlogPost[]>("/api/blog"),
  });
}

export function useBlogPost(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchAPI<BlogPost>(`/api/blog/${id}`),
    enabled: !!id,
  });
}

export function useRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetchAPI<Recipe[]>("/api/recipes"),
  });
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipes", id],
    queryFn: () => fetchAPI<Recipe>(`/api/recipes/${id}`),
    enabled: !!id,
  });
}
