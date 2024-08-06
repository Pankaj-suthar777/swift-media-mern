import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLazyUserDashboardPostVoteDataQuery } from "@/store/api/userApi";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  upvote: {
    label: "Upvote",
    color: "hsl(var(--chart-1))",
  },
  disvote: {
    label: "Disvote",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PostActivity() {
  const [timeRange, setTimeRange] = React.useState("7d");

  const [query, { data, isLoading }] = useLazyUserDashboardPostVoteDataQuery();

  const chartData = React.useMemo(() => {
    if (isLoading || !data) return [];
    return data?.data.map((item) => ({
      date: item.date,
      upvote: item.upvote,
      disvote: item.disvote,
    }));
  }, [data, isLoading]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  const onValueChangeHandler = (e: string) => {
    setTimeRange(e);
  };

  React.useEffect(() => {
    if (timeRange) {
      query(timeRange);
    }
  }, [timeRange, query]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Post Activity</CardTitle>
          <CardDescription>
            Showing post activity for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={onValueChangeHandler}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillUpvote" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-upvote)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-upvote)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDisvote" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-disvote)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-disvote)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="disvote"
              type="natural"
              fill="url(#fillDisvote)"
              stroke="var(--color-disvote)"
              stackId="a"
            />
            <Area
              dataKey="upvote"
              type="natural"
              fill="url(#fillUpvote)"
              stroke="var(--color-upvote)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}