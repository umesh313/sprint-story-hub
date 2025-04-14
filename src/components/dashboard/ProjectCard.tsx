
import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
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
        
        <div className="mt-4">
          <div className="text-sm font-medium mb-1">Tasks</div>
          <div className="flex justify-between text-sm">
            <div>Total: {project.tasks.length}</div>
            <div>Completed: {project.tasks.filter(task => task.status === 'done').length}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
