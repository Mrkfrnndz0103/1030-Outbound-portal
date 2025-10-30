import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: string;
}

export function DashboardStatCard({
  label,
  value,
  icon: Icon,
  trend,
  accentColor = "bg-primary",
}: DashboardStatCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-200">
      <div className={cn("absolute left-0 top-0 h-full w-1 rounded-l-lg", accentColor)} />
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="text-4xl font-bold tabular-nums" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-status-done" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={cn(
                  "font-medium",
                  trend.isPositive ? "text-status-done" : "text-destructive"
                )}
              >
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
