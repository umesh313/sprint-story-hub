
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/types";
import { addDays, format, startOfDay, subDays } from "date-fns";

interface HeatmapChartProps {
  tasks: Task[];
}

const HeatmapChart = ({ tasks }: HeatmapChartProps) => {
  const [heatmapData, setHeatmapData] = useState<
    Array<{ date: Date; count: number; intensity: 1 | 2 | 3 | 4 }>
  >([]);

  useEffect(() => {
    // Create data for the last 30 days
    const today = startOfDay(new Date());
    const thirtyDaysAgo = subDays(today, 29);
    
    // Initialize array with dates
    const dates = Array.from({ length: 30 }, (_, index) => {
      return addDays(thirtyDaysAgo, index);
    });
    
    // Get completed tasks by date
    const tasksByDate = tasks
      .filter(task => task.status === "done")
      .reduce((acc, task) => {
        const date = startOfDay(new Date(task.deadline)).getTime();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
    
    // Map dates to heatmap data
    const data = dates.map(date => {
      const timestamp = date.getTime();
      const count = tasksByDate[timestamp] || 0;
      
      // Calculate intensity based on count
      let intensity: 1 | 2 | 3 | 4;
      if (count === 0) intensity = 1;
      else if (count <= 2) intensity = 2;
      else if (count <= 4) intensity = 3;
      else intensity = 4;
      
      return { date, count, intensity };
    });
    
    setHeatmapData(data);
  }, [tasks]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Productivity Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-1 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-30">
          {heatmapData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`h-5 w-5 rounded-sm ${
                  item.intensity === 1 ? "bg-primary/10" :
                  item.intensity === 2 ? "bg-primary/30" :
                  item.intensity === 3 ? "bg-primary/60" :
                  "bg-primary"
                }`}
                title={`${format(item.date, "MMM d")}: ${item.count} tasks completed`}
              />
              {index % 5 === 0 && (
                <span className="text-xs text-muted-foreground mt-1">
                  {format(item.date, "d")}
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-xs">Less</div>
          <div className="flex gap-1">
            <div className="h-3 w-3 bg-primary/10 rounded-sm"></div>
            <div className="h-3 w-3 bg-primary/30 rounded-sm"></div>
            <div className="h-3 w-3 bg-primary/60 rounded-sm"></div>
            <div className="h-3 w-3 bg-primary rounded-sm"></div>
          </div>
          <div className="text-xs">More</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapChart;
