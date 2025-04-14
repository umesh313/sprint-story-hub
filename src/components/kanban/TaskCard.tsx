
import { Task } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getDeadlineStatus } from "@/data/mockData";
import { Badge } from "../ui/badge";

interface TaskCardProps {
  task: Task;
  onDragStart: () => void;
}

const TaskCard = ({ task, onDragStart }: TaskCardProps) => {
  const deadlineStatus = getDeadlineStatus(task.deadline);
  
  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm">{task.title}</h4>
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs",
            task.priority === "low" && "priority-low",
            task.priority === "medium" && "priority-medium",
            task.priority === "high" && "priority-high",
          )}
        >
          {task.priority}
        </Badge>
      </div>
      
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex justify-between items-center">
        <Avatar className="h-6 w-6">
          <AvatarImage src={task.assignedTo.avatar} />
          <AvatarFallback>{task.assignedTo.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div 
          className={cn(
            "text-xs px-2 py-1 rounded-full",
            deadlineStatus === "overdue" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
            deadlineStatus === "approaching" && "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
            deadlineStatus === "future" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
          )}
        >
          {format(new Date(task.deadline), "MMM d")}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
