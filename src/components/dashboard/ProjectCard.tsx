
import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { DollarSign } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Calculate remaining budget and percentage spent
  const remainingBudget = project.budget - project.costSpent;
  const percentSpent = Math.round((project.costSpent / project.budget) * 100);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
        
        <div className="mt-4 space-y-3">
          <div className="text-sm font-medium mb-1">Tasks</div>
          <div className="flex justify-between text-sm">
            <div>Total: {project.tasks.length}</div>
            <div>Completed: {project.tasks.filter(task => task.status === 'done').length}</div>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex items-center gap-1 text-sm font-medium mb-2">
              <DollarSign className="h-4 w-4" />
              <span>Budget</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/30 p-2 rounded-md">
                <span className="block text-muted-foreground text-xs">Budget</span>
                <span className="font-medium">${project.budget.toLocaleString()}</span>
              </div>
              <div className="bg-muted/30 p-2 rounded-md">
                <span className="block text-muted-foreground text-xs">Spent</span>
                <span className="font-medium">${project.costSpent.toLocaleString()}</span>
              </div>
              <div className="bg-muted/30 p-2 rounded-md">
                <span className="block text-muted-foreground text-xs">Remaining</span>
                <span className={`font-medium ${remainingBudget < 0 ? 'text-red-500' : ''}`}>
                  ${remainingBudget.toLocaleString()}
                </span>
              </div>
              <div className="bg-muted/30 p-2 rounded-md">
                <span className="block text-muted-foreground text-xs">% Used</span>
                <span className={`font-medium ${percentSpent > 90 ? 'text-amber-500' : percentSpent > 100 ? 'text-red-500' : ''}`}>
                  {percentSpent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
