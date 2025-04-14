
import { Column, Task } from "@/types";
import TaskCard from "./TaskCard";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDragStart: (task: Task) => void;
  onDragOver: (e: React.DragOverEvent, columnId: string) => void;
  onDrop: (columnId: string) => void;
}

const KanbanColumn = ({
  column,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}: KanbanColumnProps) => {
  return (
    <div className="kanban-column">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{column.title}</h3>
        <span className="text-xs py-1 px-2 bg-primary/10 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div
        className="min-h-[200px]"
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver(e, column.id);
        }}
        onDrop={() => onDrop(column.id)}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={() => onDragStart(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
