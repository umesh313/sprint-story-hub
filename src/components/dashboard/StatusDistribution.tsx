
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { columns } from "@/data/mockData";

interface StatusDistributionProps {
  tasks: Task[];
}

const StatusDistribution = ({ tasks }: StatusDistributionProps) => {
  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status]++;
      return acc;
    },
    { todo: 0, "in-progress": 0, review: 0, done: 0 }
  );

  const data = columns.map(column => ({
    name: column.title,
    count: statusCounts[column.id],
    fill: column.id === "todo" 
      ? "#8B5CF6" 
      : column.id === "in-progress" 
      ? "#0EA5E9" 
      : column.id === "review" 
      ? "#F97316" 
      : "#22C55E"
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Task Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`${value} tasks`, "Count"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="fill" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusDistribution;
