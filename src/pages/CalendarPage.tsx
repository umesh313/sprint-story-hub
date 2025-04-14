
import { mockTasks } from "@/data/mockData";
import CalendarView from "@/components/calendar/CalendarView";

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendar</h1>
      </div>
      
      <CalendarView tasks={mockTasks} />
    </div>
  );
};

export default CalendarPage;
