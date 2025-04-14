
export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "review" | "done";

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline: string; // ISO date string
  assignedTo: User;
}

export interface Column {
  id: Status;
  title: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  progress: number; // 0-100
}
