
import { Activity, Calendar, CheckCircle, Clock, DollarSign, FileText } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/dashboard/ProjectCard";
import PriorityDistribution from "@/components/dashboard/PriorityDistribution";
import StatusDistribution from "@/components/dashboard/StatusDistribution";
import HeatmapChart from "@/components/analytics/HeatmapChart";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import SpendingDistribution from "@/components/dashboard/SpendingDistribution";

const DashboardPage = () => {
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(task => task.status === "done").length;
  const overdueTasks = mockTasks.filter(
    task => 
      new Date(task.deadline) < new Date() && 
      task.status !== "done"
  ).length;
  
  // Calculate total budget and spent across all projects
  const totalBudget = mockProjects.reduce((sum, project) => sum + project.budget, 0);
  const totalSpent = mockProjects.reduce((sum, project) => sum + project.costSpent, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
          title="Total Budget"
          value={`$${totalBudget.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatsCard 
          title="Spent"
          value={`$${totalSpent.toLocaleString()}`}
          icon={Activity}
          trend={totalSpent / totalBudget > 0.9 ? "down" : "neutral"}
          trendValue={`${Math.round((totalSpent / totalBudget) * 100)}% of budget used`}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetOverview projects={mockProjects} />
        
        <div className="space-y-6">
          <SpendingDistribution projects={mockProjects} />
          <StatusDistribution tasks={mockTasks} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
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
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriorityDistribution tasks={mockTasks} />
        
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
