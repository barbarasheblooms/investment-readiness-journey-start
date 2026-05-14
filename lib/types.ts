export interface Resource {
  type: "article" | "video" | "book" | "podcast" | "tool";
  title: string;
  author?: string;
  url: string;
  description?: string;
}

export interface TaskDetail {
  why?: string;
  how?: string;
  evidence?: string;
}

export interface Task {
  id: string;
  title: string;
  points: number;
  area?: string;
  badges?: ("gate" | "north-star")[];
  detail?: TaskDetail;
  gateMessage?: string;
  notesPrompt?: string;
  resources?: Resource[];
}

export interface TaskGroup {
  id: string;
  name: string;
  tasks: Task[];
}

export interface NorthStarMetric {
  title: string;
  description: string;
}

export interface Stage {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  bgColor: string;
  northStarMetric?: NorthStarMetric;
  groups: TaskGroup[];
}

export interface Milestone {
  id: string;
  label: string;
  minScore: number;
  bgColor: string;
  color: string;
}

export interface Area {
  id: string;
  label: string;
  color: string;
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
