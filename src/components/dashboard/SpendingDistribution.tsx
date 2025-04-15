
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

  // Custom label renderer to truncate long project names
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const name = data[index].name;
    // Shorter truncation to prevent text from going outside the chart
    const truncatedName = name.length > 10 ? `${name.slice(0, 8)}...` : name;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central" 
        fontSize="0.7rem" 
        fontWeight="bold"
      >
        {`${truncatedName}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="h-full mx-0 my-[15px] py-0 px-[15px]">
      <CardHeader className="my-[14px]">
        <CardTitle className="text-lg text-center">Spending Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={data} 
                cx="50%" 
                cy="50%" 
                innerRadius={60} 
                outerRadius={90} 
                paddingAngle={5} 
                dataKey="value" 
                label={renderCustomizedLabel} 
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={value => [`$${Number(value).toLocaleString()}`, "Spent"]} 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
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
