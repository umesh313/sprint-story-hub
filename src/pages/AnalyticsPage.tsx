
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GanttChart from "@/components/analytics/GanttChart";
import HeatmapChart from "@/components/analytics/HeatmapChart";
import { mockTasks } from "@/data/mockData";
import PriorityDistribution from "@/components/dashboard/PriorityDistribution";
import StatusDistribution from "@/components/dashboard/StatusDistribution";

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusDistribution tasks={mockTasks} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Priority Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <PriorityDistribution tasks={mockTasks} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <GanttChart tasks={mockTasks} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Productivity Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <HeatmapChart tasks={mockTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
