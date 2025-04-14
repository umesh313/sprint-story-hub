
import { Column, Project, Task, User } from "../types";

export const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=8B5CF6&color=fff",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=F97316&color=fff",
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    avatar: "https://ui-avatars.com/api/?name=Bob+Johnson&background=0EA5E9&color=fff",
  },
  {
    id: "user-4",
    name: "Alice Williams",
    avatar: "https://ui-avatars.com/api/?name=Alice+Williams&background=22C55E&color=fff",
  },
  {
    id: "user-5",
    name: "David Brown",
    avatar: "https://ui-avatars.com/api/?name=David+Brown&background=EF4444&color=fff",
  },
];

export const columns: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Design new landing page",
    description: "Create a modern landing page for our product with clear CTA and testimonials section.",
    status: "todo",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    assignedTo: users[0],
  },
  {
    id: "task-2",
    title: "Implement authentication",
    description: "Add user authentication using OAuth and JWT tokens for secure access.",
    status: "in-progress",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    assignedTo: users[1],
  },
  {
    id: "task-3",
    title: "Write API documentation",
    description: "Document all API endpoints, request parameters, and response formats.",
    status: "review",
    priority: "medium",
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    assignedTo: users[2],
  },
  {
    id: "task-4",
    title: "Fix navigation bug",
    description: "Resolve issue with dropdown menu not working correctly on mobile devices.",
    status: "todo",
    priority: "medium",
    deadline: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago (overdue)
    assignedTo: users[3],
  },
  {
    id: "task-5",
    title: "Update privacy policy",
    description: "Review and update privacy policy to comply with new regulations.",
    status: "done",
    priority: "low",
    deadline: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    assignedTo: users[4],
  },
  {
    id: "task-6",
    title: "Optimize database queries",
    description: "Improve performance by optimizing slow database queries.",
    status: "in-progress",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
    assignedTo: users[0],
  },
  {
    id: "task-7",
    title: "Create onboarding emails",
    description: "Design and write copy for onboarding email sequence.",
    status: "todo",
    priority: "medium",
    deadline: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    assignedTo: users[1],
  },
  {
    id: "task-8",
    title: "Set up analytics",
    description: "Implement Google Analytics and create custom events for important user actions.",
    status: "done",
    priority: "medium",
    deadline: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    assignedTo: users[2],
  },
  {
    id: "task-9",
    title: "Design system updates",
    description: "Update design system components to new brand guidelines.",
    status: "review",
    priority: "low",
    deadline: new Date(Date.now() + 86400000 * 4).toISOString(), // 4 days from now
    assignedTo: users[3],
  },
  {
    id: "task-10",
    title: "User testing plan",
    description: "Create plan for user testing sessions including tasks and questions.",
    status: "todo",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    assignedTo: users[4],
  },
];

export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Website Redesign",
    tasks: mockTasks.slice(0, 4),
    progress: 25,
  },
  {
    id: "project-2",
    name: "Mobile App Development",
    tasks: mockTasks.slice(4, 7),
    progress: 60,
  },
  {
    id: "project-3",
    name: "Marketing Campaign",
    tasks: mockTasks.slice(7, 10),
    progress: 80,
  },
];

// Utility function to group tasks by status
export const getTasksByStatus = (tasks: Task[]) => {
  return tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<Status, Task[]>);
};

// Calculate days until deadline
export const getDaysUntilDeadline = (deadline: string) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Get deadline status (overdue, approaching, future)
export const getDeadlineStatus = (deadline: string) => {
  const daysUntil = getDaysUntilDeadline(deadline);
  if (daysUntil < 0) return "overdue";
  if (daysUntil <= 3) return "approaching";
  return "future";
};
