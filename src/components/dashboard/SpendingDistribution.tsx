import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Project } from "@/types";
interface SpendingDistributionProps {
  projects: Project[];
}
const SpendingDistribution = ({
  projects
}: SpendingDistributionProps) => {
  // Prepare data for pie chart - show spending by project
  const data = projects.map(project => ({
    name: project.name,
    value: project.costSpent,
    color: getRandomColor(project.id) // Generate color based on project ID for consistency
  }));
  return <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg text-center">Spending Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" label={({
              name,
              percent
            }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={value => [`$${Number(value).toLocaleString()}`, "Spent"]} contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>;
};

// Function to generate consistent colors based on string input
const getRandomColor = (str: string) => {
  // List of predefined colors to choose from
  const colors = ["#8B5CF6", "#D946EF", "#F97316", "#0EA5E9", "#22C55E", "#EAB308", "#F43F5E", "#6366F1", "#14B8A6", "#EC4899"];

  // Use string to deterministically select a color
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
export default SpendingDistribution;