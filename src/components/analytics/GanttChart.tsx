
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/types";
import { format, isAfter, parseISO } from "date-fns";

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart = ({ tasks }: GanttChartProps) => {
  // Sort tasks by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    return isAfter(parseISO(a.deadline), parseISO(b.deadline)) ? 1 : -1;
  });
  
  // Find earliest and latest dates for scaling
  const earliestDate = parseISO(
    sortedTasks.length > 0 ? sortedTasks[0].deadline : new Date().toISOString()
  );
  
  const latestDate = parseISO(
    sortedTasks.length > 0 
    ? sortedTasks[sortedTasks.length - 1].deadline 
    : new Date().toISOString()
  );
  
  // Calculate total days span for width scaling
  const totalDays = Math.max(
    1,
    Math.ceil((latestDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  
  // Function to calculate position and width
  const getBarStyle = (task: Task) => {
    const taskDate = parseISO(task.deadline);
    const daysSinceStart = Math.max(
      0,
      Math.ceil((taskDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24))
    );
    
    const leftPercent = (daysSinceStart / totalDays) * 100;
    
    // Determine color based on status
    let color;
    switch (task.status) {
      case "done":
        color = "bg-green-500";
        break;
      case "review":
        color = "bg-orange-500";
        break;
      case "in-progress":
        color = "bg-blue-500";
        break;
      default:
        color = "bg-purple-500";
    }
    
    return {
      left: `${leftPercent}%`,
      width: "2%", // Fixed minimal width for visibility
      className: `absolute h-6 rounded ${color}`
    };
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Task Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Time scale */}
            <div className="flex justify-between mb-4">
              <div>{format(earliestDate, "MMM d")}</div>
              <div>{format(latestDate, "MMM d")}</div>
            </div>
            
            {/* Task bars */}
            <div className="relative border-t border-t-border pt-4">
              {sortedTasks.map((task) => {
                const barStyle = getBarStyle(task);
                
                return (
                  <div key={task.id} className="h-10 mb-2 relative">
                    <div className="absolute left-0 text-sm truncate w-1/4">
                      {task.title}
                    </div>
                    <div 
                      style={{ left: barStyle.left, width: barStyle.width }}
                      className={barStyle.className}
                      title={`${task.title} - Due: ${format(parseISO(task.deadline), "MMM d, yyyy")}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
