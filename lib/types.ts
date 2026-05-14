export interface Task {
  id: string;
  label: string;
  points: number;
  badges: ("gate" | "northstar")[];
  why: string;
  how: string;
  evidence: string;
  resources: Resource[];
}

export interface Resource {
  type: "article" | "video" | "book" | "podcast" | "tool";
  title: string;
  url: string;
}

export interface TaskGroup {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Stage {
  id: number;
  title: string;
  subtitle: string;
  pointsRange: [number, number];
  groups: TaskGroup[];
  locked: boolean;
}

export interface Milestone {
  id: string;
  label: string;
  points: number;
}

export interface FounderJourney {
  id?: string;
  email: string;
  name: string;
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  links: Record<string, string>;
  score: number;
  grow_ready_shown: boolean;
  created_at?: string;
}
