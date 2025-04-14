
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PriorityDistributionProps {
  tasks: Task[];
}

const PriorityDistribution = ({ tasks }: PriorityDistributionProps) => {
  const priorityCounts = tasks.reduce(
    (acc, task) => {
      acc[task.priority]++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );

  const data = [
    { name: "Low", value: priorityCounts.low, color: "#22C55E" },
    { name: "Medium", value: priorityCounts.medium, color: "#FACC15" },
    { name: "High", value: priorityCounts.high, color: "#EF4444" },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Task Priority Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => 
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityDistribution;
