
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { useState } from "react";
import { Task } from "@/types";
import { format } from "date-fns";
import TaskCard from "../kanban/TaskCard";
import { isSameDay } from "date-fns";

interface CalendarViewProps {
  tasks: Task[];
}

const CalendarView = ({ tasks }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const tasksForSelectedDate = selectedDate
    ? tasks.filter((task) => 
        isSameDay(new Date(task.deadline), selectedDate)
      )
    : [];
  
  // Determine dates that have tasks
  const datesWithTasks = tasks.map(task => new Date(task.deadline));
  
  // Function to check if a date has tasks
  const isDayWithTask = (date: Date) => {
    return datesWithTasks.some(taskDate => isSameDay(taskDate, date));
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <CalendarUI
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-md p-3"
          modifiers={{
            withTask: (date) => isDayWithTask(date),
          }}
          modifiersClassNames={{
            withTask: "bg-primary/10 text-primary font-medium rounded-md",
          }}
        />
      </div>
      
      <div className="lg:w-1/2">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-4">
            Tasks for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Selected Date"}
          </h3>
          
          {tasksForSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {tasksForSelectedDate.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDragStart={() => {}} 
                />
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground py-8 text-center">
              No tasks scheduled for this date
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
