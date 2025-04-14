
import { Activity, Calendar, CheckCircle, Clock, FileText } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/dashboard/ProjectCard";
import PriorityDistribution from "@/components/dashboard/PriorityDistribution";
import StatusDistribution from "@/components/dashboard/StatusDistribution";
import HeatmapChart from "@/components/analytics/HeatmapChart";

const DashboardPage = () => {
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(task => task.status === "done").length;
  const overdueTasks = mockTasks.filter(
    task => 
      new Date(task.deadline) < new Date() && 
      task.status !== "done"
  ).length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Tasks"
          value={totalTasks}
          icon={FileText}
        />
        <StatsCard 
          title="Completed"
          value={completedTasks}
          icon={CheckCircle}
          trend="up"
          trendValue="4 more than last week"
        />
        <StatsCard 
          title="Overdue"
          value={overdueTasks}
          icon={Clock}
          trend={overdueTasks > 0 ? "down" : "neutral"}
          trendValue={overdueTasks > 0 ? `${overdueTasks} need attention` : "All on track"}
        />
        <StatsCard 
          title="Upcoming Deadlines"
          value={
            mockTasks.filter(
              task => 
                new Date(task.deadline) > new Date() && 
                new Date(task.deadline) < new Date(Date.now() + 86400000 * 7)
            ).length
          }
          icon={Calendar}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <PriorityDistribution tasks={mockTasks} />
          <StatusDistribution tasks={mockTasks} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Analytics</CardTitle>
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
                  Activity analytics will be available in the next update
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
