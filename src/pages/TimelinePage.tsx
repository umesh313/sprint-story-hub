
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GanttChart from "@/components/analytics/GanttChart";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const TimelinePage = () => {
  // Demo data for spending timeline
  const spendingTimelineData = [
    { month: 'Jan', budget: 10000, actual: 9500 },
    { month: 'Feb', budget: 20000, actual: 18500 },
    { month: 'Mar', budget: 30000, actual: 32000 },
    { month: 'Apr', budget: 40000, actual: 41500 },
    { month: 'May', budget: 50000, actual: 52000 },
    { month: 'Jun', budget: 60000, actual: 62000 },
    { month: 'Jul', budget: 70000, actual: 68000 },
    { month: 'Aug', budget: 80000, actual: 78000 },
    { month: 'Sep', budget: 90000, actual: 87000 },
  ];
  
  // Chart configuration
  const chartConfig = {
    budget: {
      label: "Planned Budget",
      theme: {
        light: "#8B5CF6",
        dark: "#9b87f5"
      }
    },
    actual: {
      label: "Actual Spending",
      theme: {
        light: "#F97316",
        dark: "#FEC6A1"
      }
    }
  };

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
      
      <Card>
        <CardHeader>
          <CardTitle>Budget Timeline</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[350px]">
            <ChartContainer config={chartConfig}>
              <LineChart data={spendingTimelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent 
                          className="border-none" 
                          payload={payload}
                          formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tasks">
            <TabsList className="mb-4">
              <TabsTrigger value="tasks">Task Timeline</TabsTrigger>
              <TabsTrigger value="budget">Budget Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <div className="space-y-4">
                {mockProjects.map(project => {
                  const projectTasks = project.tasks.sort(
                    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                  );
                  
                  const startDate = projectTasks.length > 0 
                    ? new Date(projectTasks[0].deadline)
                    : new Date();
                    
                  const endDate = projectTasks.length > 0 
                    ? new Date(projectTasks[projectTasks.length - 1].deadline)
                    : new Date();
                    
                  const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {durationDays} days duration
                        </div>
                      </div>
                      
                      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                        {/* Timeline bar */}
                        <div 
                          className="absolute top-0 h-full bg-primary/30 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        />
                        
                        {/* Current position marker */}
                        <div 
                          className="absolute top-0 h-full w-1 bg-primary rounded-full"
                          style={{ left: `${project.progress}%` }}
                        />
                        
                        {/* Start and end labels */}
                        <div className="absolute top-0 left-2 h-full flex items-center text-xs">
                          Start
                        </div>
                        <div className="absolute top-0 right-2 h-full flex items-center text-xs">
                          End
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <div>
                          {startDate.toLocaleDateString()}
                        </div>
                        <div>
                          {endDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="budget">
              <div className="space-y-4">
                {mockProjects.map(project => {
                  const percentBudgetUsed = Math.round((project.costSpent / project.budget) * 100);
                  
                  return (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          Budget: ${project.budget.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                        {/* Budget bar */}
                        <div 
                          className={`absolute top-0 h-full rounded-full ${
                            percentBudgetUsed > 100 
                              ? 'bg-red-500/70' 
                              : percentBudgetUsed > 90 
                              ? 'bg-amber-500/70' 
                              : 'bg-green-500/70'
                          }`}
                          style={{ width: `${Math.min(percentBudgetUsed, 100)}%` }}
                        />
                        
                        {/* Current position label */}
                        <div 
                          className="absolute top-0 h-full flex items-center justify-center w-full text-xs font-medium"
                        >
                          ${project.costSpent.toLocaleString()} ({percentBudgetUsed}%)
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-2 text-xs">
                        <div className={`font-medium ${percentBudgetUsed <= 100 ? 'text-green-600' : 'text-red-600'}`}>
                          {percentBudgetUsed <= 100 
                            ? `$${(project.budget - project.costSpent).toLocaleString()} remaining` 
                            : `$${(project.costSpent - project.budget).toLocaleString()} over budget`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelinePage;
