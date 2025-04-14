
import { mockProjects, mockTasks } from "@/data/mockData";
import CalendarView from "@/components/calendar/CalendarView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GanttChart from "@/components/analytics/GanttChart";

const CalendarPage = () => {
  // Calculate upcoming deadlines
  const upcomingDeadlines = mockTasks
    .filter(task => {
      const deadline = new Date(task.deadline);
      const today = new Date();
      const inNextWeek = new Date();
      inNextWeek.setDate(today.getDate() + 7);
      
      return deadline >= today && deadline <= inNextWeek && task.status !== 'done';
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendar</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendar">
            <TabsList className="mb-4">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
              <CalendarView tasks={mockTasks} />
            </TabsContent>
            <TabsContent value="gantt">
              <GanttChart tasks={mockTasks} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-3">
                {upcomingDeadlines.map(task => {
                  const deadline = new Date(task.deadline);
                  const today = new Date();
                  const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  
                  let urgencyColor = "bg-green-100 text-green-800";
                  if (diffDays <= 1) {
                    urgencyColor = "bg-red-100 text-red-800";
                  } else if (diffDays <= 3) {
                    urgencyColor = "bg-amber-100 text-amber-800";
                  }
                  
                  // Find which project this task belongs to
                  const project = mockProjects.find(p => 
                    p.tasks.some(t => t.id === task.id)
                  );
                  
                  return (
                    <div key={task.id} className="border rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          {project && (
                            <p className="text-sm text-muted-foreground">
                              Project: {project.name}
                            </p>
                          )}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${urgencyColor}`}>
                          {diffDays === 0 ? "Today" : diffDays === 1 ? "Tomorrow" : `In ${diffDays} days`}
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <div className="flex items-center mr-4">
                          <span className="font-medium mr-1">Status:</span> 
                          {task.status === "todo" && "To Do"}
                          {task.status === "in-progress" && "In Progress"}
                          {task.status === "review" && "Review"}
                          {task.status === "done" && "Done"}
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">Priority:</span>
                          <span 
                            className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              task.priority === "high" 
                                ? "bg-red-500" 
                                : task.priority === "medium" 
                                ? "bg-amber-500" 
                                : "bg-green-500"
                            }`}
                          />
                          {task.priority}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No upcoming deadlines in the next 7 days
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.map(project => {
                // Calculate days until project completion (estimated based on tasks)
                const incompleteTasks = project.tasks.filter(task => task.status !== "done");
                const latestDeadline = incompleteTasks.length > 0 
                  ? new Date(Math.max(...incompleteTasks.map(t => new Date(t.deadline).getTime())))
                  : new Date();
                
                const today = new Date();
                const daysRemaining = Math.ceil((latestDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      <div className="text-sm font-medium">
                        {project.progress}% Complete
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted h-2 rounded-full mb-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div>
                        ${project.costSpent.toLocaleString()} / ${project.budget.toLocaleString()}
                      </div>
                      <div>
                        {incompleteTasks.length > 0 
                          ? `${daysRemaining} days remaining` 
                          : "Complete"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
