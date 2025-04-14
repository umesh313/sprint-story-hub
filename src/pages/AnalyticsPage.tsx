import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GanttChart from "@/components/analytics/GanttChart";
import HeatmapChart from "@/components/analytics/HeatmapChart";
import { mockProjects, mockTasks } from "@/data/mockData";
import PriorityDistribution from "@/components/dashboard/PriorityDistribution";
import StatusDistribution from "@/components/dashboard/StatusDistribution";
import SpendingDistribution from "@/components/dashboard/SpendingDistribution";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const AnalyticsPage = () => {
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Budget Analysis</CardTitle>
        </CardHeader>
        <CardContent className="px-[35px] bg-slate-950">
          <BudgetOverview projects={mockProjects} />
        </CardContent>
      </Card>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingDistribution projects={mockProjects} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Productivity Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="heatmap">
              <TabsList className="mb-4">
                <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="heatmap">
                <HeatmapChart tasks={mockTasks} />
              </TabsContent>
              <TabsContent value="activity">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Activity analytics will be available soon
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Task Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <GanttChart tasks={mockTasks} />
        </CardContent>
      </Card>
    </div>;
};
export default AnalyticsPage;