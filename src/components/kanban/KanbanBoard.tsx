
import { useEffect, useState } from "react";
import { columns, getTasksByStatus, mockTasks } from "@/data/mockData";
import { Status, Task } from "@/types";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [tasksByStatus, setTasksByStatus] = useState<Record<Status, Task[]>>(
    getTasksByStatus(mockTasks)
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    setTasksByStatus(getTasksByStatus(tasks));
  }, [tasks]);

  const handleDragStart = (task: Task) => {
    setActiveTask(task);
  };

  const handleDragOver = (e: React.DragOverEvent, columnId: string) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: Status) => {
    if (activeTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === activeTask.id
            ? { ...task, status: columnId }
            : task
        )
      );
      setActiveTask(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={tasksByStatus[column.id] || []}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
