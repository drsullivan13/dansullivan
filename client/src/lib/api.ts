import { useQuery } from "@tanstack/react-query";

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

async function fetchAPI<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: ({ signal }) => fetchAPI<Project[]>("/api/projects", signal),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: ({ signal }) => fetchAPI<Project>(`/api/projects/${id}`, signal),
    enabled: !!id,
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: ({ signal }) => fetchAPI<BlogPost[]>("/api/blog", signal),
  });
}

export function useBlogPost(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: ({ signal }) => fetchAPI<BlogPost>(`/api/blog/${id}`, signal),
    enabled: !!id,
  });
}

export function useRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: ({ signal }) => fetchAPI<Recipe[]>("/api/recipes", signal),
  });
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipes", id],
    queryFn: ({ signal }) => fetchAPI<Recipe>(`/api/recipes/${id}`, signal),
    enabled: !!id,
  });
}

export function getMediaType(url: string): 'image' | 'gif' | 'video' | null {
  if (!url) return null;
  const ext = url.split('.').pop()?.toLowerCase();
  if (ext === 'gif') return 'gif';
  if (['mp4', 'webm', 'mov'].includes(ext || '')) return 'video';
  if (['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(ext || '')) return 'image';
  return null;
}
