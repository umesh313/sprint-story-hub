
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { DollarSign } from "lucide-react";
import { Project } from "@/types";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

interface BudgetOverviewProps {
  projects: Project[];
}

const BudgetOverview = ({
  projects
}: BudgetOverviewProps) => {
  const [chartView, setChartView] = useState<'line' | 'area'>('area');
  const isMobile = useIsMobile();

  // Calculate total budget, spent, and remaining
  const totalBudget = projects.reduce((acc, project) => acc + project.budget, 0);
  const totalSpent = projects.reduce((acc, project) => acc + project.costSpent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const percentSpent = Math.round(totalSpent / totalBudget * 100);

  // Demo data for spending trend over time
  const spendingData = [{
    month: 'Jan',
    planned: 8000,
    actual: 7200
  }, {
    month: 'Feb',
    planned: 16000,
    actual: 15800
  }, {
    month: 'Mar',
    planned: 24000,
    actual: 26000
  }, {
    month: 'Apr',
    planned: 32000,
    actual: 33500
  }, {
    month: 'May',
    planned: 40000,
    actual: 41200
  }, {
    month: 'Jun',
    planned: 48000,
    actual: totalSpent
  }];

  // Chart configuration
  const chartConfig = {
    planned: {
      label: "Planned Budget",
      theme: {
        light: "#8B5CF6",
        dark: "#9b87f5"
      }
    },
    actual: {
      label: "Actual Spending",
      theme: {
        light: "#F97316",
        dark: "#FEC6A1"
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Budget Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <button onClick={() => setChartView('line')} className={`px-2 py-1 text-xs rounded ${chartView === 'line' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            Line
          </button>
          <button onClick={() => setChartView('area')} className={`px-2 py-1 text-xs rounded ${chartView === 'area' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            Area
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-[5px] py-[5px] my-[20px] mx-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-1 text-sm font-medium mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span>Total Budget</span>
            </div>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-1 text-sm font-medium mb-2">
              <DollarSign className="h-4 w-4 text-orange-500" />
              <span>Total Spent</span>
            </div>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">{percentSpent}% of budget</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-1 text-sm font-medium mb-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span>Remaining</span>
            </div>
            <div className={`text-2xl font-bold ${totalRemaining < 0 ? 'text-red-500' : ''}`}>
              ${totalRemaining.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="h-[220px] w-full">
          <ChartContainer config={chartConfig}>
            {chartView === 'line' ? (
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={value => `$${value / 1000}k`} />
                <ChartTooltip content={({
              active,
              payload
            }) => {
              if (active && payload && payload.length) {
                return <ChartTooltipContent className="border-none" payload={payload} formatter={value => [`$${Number(value).toLocaleString()}`, undefined]} />;
              }
              return null;
            }} />
                <Legend />
                <Line type="monotone" dataKey="planned" strokeWidth={2} dot={{
              strokeWidth: 2,
              r: 4
            }} activeDot={{
              r: 6,
              strokeWidth: 2
            }} />
                <Line type="monotone" dataKey="actual" strokeWidth={2} dot={{
              strokeWidth: 2,
              r: 4
            }} activeDot={{
              r: 6,
              strokeWidth: 2
            }} />
              </LineChart>
            ) : (
              <AreaChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={value => `$${value / 1000}k`} />
                <ChartTooltip content={({
              active,
              payload
            }) => {
              if (active && payload && payload.length) {
                return <ChartTooltipContent className="border-none" payload={payload} formatter={value => [`$${Number(value).toLocaleString()}`, undefined]} />;
              }
              return null;
            }} />
                <Legend />
                <Area type="monotone" dataKey="planned" stackId="1" strokeWidth={2} fillOpacity={0.3} />
                <Area type="monotone" dataKey="actual" stackId="2" strokeWidth={2} fillOpacity={0.3} />
              </AreaChart>
            )}
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
