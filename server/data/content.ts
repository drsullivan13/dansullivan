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

export const projects: Project[] = [
  {
    id: "1",
    title: "Project Alpha 1",
    description: "A revolutionary interface for digital interaction. Built with React and WebGL.",
    fullDescription: "This project represents a quantum leap in user interface paradigms. We deconstructed the traditional navigation patterns and rebuilt them from first principles, focusing on velocity and immersion. The core challenge was optimizing the render loop to sustain 60fps while calculating complex particle physics on a mobile device. The solution involved a hybrid DOM/Canvas approach.",
    technologies: ["React", "TypeScript", "Canvas API", "Tailwind", "Vite"],
    role: "Lead Engineer",
    timeframe: "Q4 2024",
    architecture: "React + WebGL",
    demoUrl: "https://demo.example.com"
  },
  {
    id: "2",
    title: "Project Alpha 2",
    description: "Real-time collaboration platform with WebSocket architecture.",
    fullDescription: "Built a scalable real-time collaboration system that handles thousands of concurrent users. Implemented CRDT-based conflict resolution for document editing and custom WebSocket protocol for minimal latency.",
    technologies: ["Node.js", "WebSocket", "Redis", "PostgreSQL"],
    role: "Backend Architect",
    timeframe: "Q3 2024",
    architecture: "Microservices + WebSocket"
  },
  {
    id: "3",
    title: "Project Alpha 3",
    description: "AI-powered design system with generative components.",
    fullDescription: "Created an intelligent design system that adapts to user behavior and generates optimized component variations. Uses machine learning to predict accessibility issues and suggest improvements.",
    technologies: ["React", "TensorFlow.js", "Figma API", "Framer"],
    role: "Design Engineer",
    timeframe: "Q2 2024",
    architecture: "React + TensorFlow"
  },
  {
    id: "4",
    title: "Project Alpha 4",
    description: "Distributed data pipeline processing billions of events daily.",
    fullDescription: "Architected a fault-tolerant event processing system using Kafka and Flink. Handles 10M+ events per second with sub-100ms latency. Implemented custom partitioning strategy for optimal throughput.",
    technologies: ["Kafka", "Flink", "Kubernetes", "Go"],
    role: "Systems Engineer",
    timeframe: "Q1 2024",
    architecture: "Event-Driven + Stream Processing"
  },
  {
    id: "5",
    title: "Project Alpha 5",
    description: "Mobile-first progressive web app for offline-first experiences.",
    fullDescription: "Built a PWA that works seamlessly offline using service workers and IndexedDB. Implements sophisticated sync strategies and conflict resolution for multi-device workflows.",
    technologies: ["React", "Service Workers", "IndexedDB", "Web APIs"],
    role: "Frontend Lead",
    timeframe: "Q4 2023",
    architecture: "PWA + Offline-First"
  },
  {
    id: "6",
    title: "Project Alpha 6",
    description: "Blockchain-based identity verification system.",
    fullDescription: "Developed a decentralized identity platform using smart contracts and zero-knowledge proofs. Users maintain control of their data while enabling verifiable credentials.",
    technologies: ["Solidity", "Ethereum", "IPFS", "React"],
    role: "Blockchain Developer",
    timeframe: "Q3 2023",
    architecture: "Decentralized + Smart Contracts"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Interfaces is Spatial",
    subtitle: "Why we must move beyond the flat page and embrace depth, motion, and physics in web design.",
    date: "2024-10-24",
    readTime: "5 min",
    excerpt: "The screen is not a flat surface. It is a window into a deep space of information. We must design for depth, for motion, and for the joy of discovery. Minimalism is not about removing elements, but about removing friction.",
    content: `The screen has always been a lie. It pretends to be a flat piece of paper, but it is a window into an infinite space. When we treat it like paper, we constrain our thinking to margins and folds.

## Breaking the Frame

In the arcade era, interfaces were unconstrained. They were playful, responsive, and immersive. Then came the "corporate web" - grids, sidebars, and hero sections. Efficient, yes. Boring? Absolutely.

> "Magic happens when the interface dissolves, and only the interaction remains."

We are now entering a new era. With the power of modern GPUs in every pocket, we can afford to be wasteful with pixels if it means being respectful of attention. Motion is not decoration; it is information. Depth is not a gimmick; it is hierarchy.

## The Protocol

1. Make it fast.
2. Make it alive.
3. Make it meaningful.`,
    tags: ["Design", "WebGL", "UX"]
  },
  {
    id: "2",
    title: "Building for 60fps: A Performance Manifesto",
    subtitle: "The technical and philosophical foundations of butter-smooth interfaces.",
    date: "2024-09-15",
    readTime: "8 min",
    excerpt: "Performance is not a feature. It is a prerequisite for respect. Every dropped frame is a micro-betrayal of user trust.",
    content: `Performance is not a feature. It is a prerequisite for respect. Every dropped frame is a micro-betrayal of user trust. When an interface stutters, we break the fourth wall. We remind users they are using software, not experiencing magic.

## The 60fps Contract

At 60fps, you have 16.67 milliseconds per frame. This is not a lot of time. Every operation must be justified, every render optimized, every allocation considered.

The secret is not to work harder in those 16ms - it's to work smarter by doing less. Offload to GPU. Batch your updates. Use refs instead of state when React doesn't need to know.`,
    tags: ["Performance", "React", "JavaScript"]
  },
  {
    id: "3",
    title: "The Death of the Button",
    subtitle: "How gesture-based interfaces will replace traditional UI controls.",
    date: "2024-08-03",
    readTime: "6 min",
    excerpt: "Buttons are a skeuomorphic relic. In spatial computing, intention is action. The future is gestural, ambient, and implicit.",
    content: `Buttons are training wheels. They exist because we needed to translate physical world affordances to screens. But in spatial computing, we can detect intention without requiring explicit commits.

## Natural Interaction

Hover becomes interest. Dwell becomes selection. Pull becomes navigation. The interface reads micro-gestures and responds proportionally. This is not about removing buttons entirely - it's about making them optional for power users while keeping them available for newcomers.`,
    tags: ["Interaction Design", "Spatial Computing", "Future"]
  }
];

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Space Curry 1",
    description: "High-efficiency caloric intake for long-haul missions. Spicy enough to keep you alert during asteroid navigation.",
    prepTime: "20 min",
    tags: ["Vegan", "Spicy"],
    emoji: "🍜",
    ingredients: [
      "Coconut Milk (400ml)",
      "Red Curry Paste (50g)",
      "Tofu Blocks (Firm)",
      "Bamboo Shoots",
      "Thai Basil",
      "Lime Leaves"
    ],
    instructions: [
      "Initialize heating sequence on Wok unit to 400°F.",
      "Deploy curry paste into heated oil. Sauté until aromatic sensors detect peak fragrance (approx 2 min).",
      "Slowly inject coconut milk while maintaining constant agitation to prevent separation.",
      "Introduce solid matter (tofu, bamboo). Reduce thermal output to simmer state.",
      "Execute simmer cycle for 15 minutes.",
      "Terminate heat. Garnish with basil immediately before consumption."
    ]
  },
  {
    id: "2",
    title: "Space Curry 2",
    description: "A green variant optimized for digestive efficiency in zero-gravity environments.",
    prepTime: "25 min",
    tags: ["Vegan", "Mild"],
    emoji: "🍳",
    ingredients: [
      "Green Curry Paste (40g)",
      "Coconut Cream (300ml)",
      "Eggplant (Cubed)",
      "Green Beans",
      "Chickpeas (Cooked)",
      "Kaffir Lime Leaves"
    ],
    instructions: [
      "Activate thermal chamber to medium-high heat.",
      "Introduce green curry paste. Agitate for 90 seconds.",
      "Add coconut cream gradually while stirring.",
      "Insert vegetables in order of density: eggplant, then beans.",
      "Add chickpeas. Simmer for 18 minutes.",
      "Garnish with lime leaves. Serve immediately."
    ]
  },
  {
    id: "3",
    title: "Space Curry 3",
    description: "Yellow variant with turmeric - anti-inflammatory properties ideal for extended missions.",
    prepTime: "22 min",
    tags: ["Vegan", "Anti-inflammatory"],
    emoji: "🍜",
    ingredients: [
      "Yellow Curry Paste (45g)",
      "Coconut Milk (350ml)",
      "Sweet Potato (Cubed)",
      "Cauliflower Florets",
      "Turmeric Powder (5g)",
      "Cilantro"
    ],
    instructions: [
      "Heat wok to 380°F.",
      "Dissolve curry paste in small amount of oil.",
      "Pour coconut milk. Stir until homogeneous.",
      "Add sweet potato. Cook for 8 minutes.",
      "Add cauliflower and turmeric. Simmer 12 minutes.",
      "Finish with fresh cilantro."
    ]
  },
  {
    id: "4",
    title: "Space Curry 4",
    description: "Massaman fusion with peanut base - high protein for muscle maintenance in low-gravity.",
    prepTime: "30 min",
    tags: ["Vegan", "High-Protein"],
    emoji: "🍳",
    ingredients: [
      "Massaman Curry Paste (55g)",
      "Coconut Milk (400ml)",
      "Peanut Butter (60g)",
      "Potatoes (Cubed)",
      "Peanuts (Roasted)",
      "Tamarind Paste"
    ],
    instructions: [
      "Set thermal unit to medium heat.",
      "Fry curry paste until fragrant (3 min).",
      "Mix in peanut butter and coconut milk.",
      "Add potatoes. Cook covered for 20 minutes.",
      "Stir in tamarind paste.",
      "Top with roasted peanuts before serving."
    ]
  }
];
