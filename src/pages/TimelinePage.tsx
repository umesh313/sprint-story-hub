
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GanttChart from "@/components/analytics/GanttChart";
import { mockTasks } from "@/data/mockData";

const TimelinePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Timeline</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <GanttChart tasks={mockTasks} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelinePage;
