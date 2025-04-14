
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import CalendarView from "@/components/calendar/CalendarView";
import { mockTasks } from "@/data/mockData";
import { Plus } from "lucide-react";

const KanbanPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Task
        </Button>
      </div>
      
      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban" className="mt-6">
          <KanbanBoard />
        </TabsContent>
        <TabsContent value="calendar" className="mt-6">
          <CalendarView tasks={mockTasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KanbanPage;
