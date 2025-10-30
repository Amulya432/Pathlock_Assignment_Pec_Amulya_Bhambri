// src/types.ts
export type AuthToken = string | null;

export interface Project {
  id: number | string;
  title: string;
  description?: string;
  createdAt?: string;
}

export interface TaskItem {
  id: number | string;
  title: string;
  dueDate?: string | null;
  isCompleted: boolean;
  projectId?: number | string;
}
