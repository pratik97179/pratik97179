export type ProjectStatus = "wip" | "done" | "archived";

export interface TechItem {
  name: string;
  icon: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  github: string;
}

export interface Article {
  title: string;
  summary: string;
  topic: string;
  tags: string[];
  published: string;
  url: string;
}

export interface ProfileContent {
  identity: {
    name: string;
    title: string;
    location: string;
    yearsExperience: number;
    tagline: {
      before: string;
      emphasis: string;
      middle: string;
      contrast: string;
    };
  };
  stack: TechItem[];
  exploring: string[];
  projects: Project[];
  articles: Article[];
  githubUsername: string;
  links: {
    github: string;
    linkedin: string;
    medium: string;
    email: string;
  };
}

export const profile: ProfileContent = {
  identity: {
    name: "PRATIK NATH TIWARI",
    title: "Software Engineer",
    location: "India",
    yearsExperience: 5,
    tagline: {
      before: "Designing software from the",
      emphasis: "runtime up",
      middle: ", not the ",
      contrast: "interface down",
    },
  },
  stack: [
    { name: "Flutter", icon: "flutter" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextdotjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Kotlin", icon: "kotlin" },
    { name: "Swift", icon: "swift" },
    { name: "Go", icon: "go" },
    { name: "Dart", icon: "dart" },
  ],
  exploring: ["Computer Vision", "Realtime Networking", "Fintech Systems", "Go"],
  projects: [
    {
      name: "AirCursor",
      description:
        "Hands-free macOS cursor control from a laptop webcam, using MediaPipe hand tracking and OpenCV.",
      technologies: ["Python", "OpenCV", "MediaPipe", "PyObjC"],
      status: "wip",
      github: "https://github.com/pratik97179/aircursor",
    },
    {
      name: "ws_client",
      description:
        "High-performance Dart WebSocket client for HFT and scalper terminals, with sequencing, batching, and a sync hot path.",
      technologies: ["Dart", "WebSocket", "Flutter"],
      status: "done",
      github: "https://github.com/pratik97179/ws_client",
    },
    {
      name: "dependency_inj",
      description:
        "Flutter/Dart service-locator module that wraps GetIt behind an app-owned IServiceLocator boundary.",
      technologies: ["Flutter", "Dart", "GetIt"],
      status: "done",
      github: "https://github.com/pratik97179/dependency_inj",
    },
  ],
  articles: [
    {
      title: "Hybrid State Management in Flutter: Why I Mix Patterns",
      summary:
        "One state management solution across the entire app sounds clean. In practice, match tools to the shape of the problem.",
      topic: "Engineering",
      tags: ["Flutter", "State Management", "Architecture"],
      published: "Feb 2026",
      url: "https://medium.com/@pratiknathtiwari/hybrid-state-management-in-flutter-why-i-mix-patterns-and-when-you-shouldnt-909adc1c2b08",
    },
    {
      title: "Provider as a Scoped Dependency Propagation Mechanism",
      summary:
        "Provider is commonly introduced as state management. Its original design points to scoped dependency propagation.",
      topic: "Engineering",
      tags: ["Flutter", "Provider", "Architecture", "Dart"],
      published: "Jan 2026",
      url: "https://medium.com/@pratiknathtiwari/provider-as-a-scoped-dependency-propagation-mechanism-080390f90c45",
    },
    {
      title: "Probabilistic Code Generation with AI",
      summary:
        "AI doesn't write perfect code. It writes likely code. That shift changes how we build software.",
      topic: "Engineering",
      tags: ["AI", "Software Development", "Architecture"],
      published: "Jul 2025",
      url: "https://medium.com/@pratiknathtiwari/probabilistic-code-generation-with-ai-a-smarter-way-to-build-software-fc08f9d008bc",
    },
    {
      title: "Mastering the S.O.L.I.D Principles",
      summary:
        "SOLID as the cornerstone of clean, scalable OOP, with Dart examples for each principle.",
      topic: "Engineering",
      tags: ["SOLID", "OOP", "Dart", "Architecture"],
      published: "Nov 2024",
      url: "https://medium.com/@pratiknathtiwari/mastering-the-s-o-l-i-d-principles-c286c88fcb05",
    },
  ],
  githubUsername: "pratik97179",
  links: {
    github: "https://github.com/pratik97179",
    linkedin: "https://www.linkedin.com/in/pratiknathtiwari",
    medium: "https://medium.com/@pratiknathtiwari",
    email: "mailto:prateek.infinite.370@gmail.com",
  },
};
