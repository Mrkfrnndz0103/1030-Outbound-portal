import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DispatchStatus = "Pending" | "Ongoing" | "Done";

interface StatusBadgeProps {
  status: DispatchStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    Pending: {
      color: "bg-status-pending/10 text-status-pending border-status-pending/20",
      dot: "bg-status-pending",
    },
    Ongoing: {
      color: "bg-status-ongoing/10 text-status-ongoing border-status-ongoing/20",
      dot: "bg-status-ongoing",
    },
    Done: {
      color: "bg-status-done/10 text-status-done border-status-done/20",
      dot: "bg-status-done",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 font-medium transition-colors duration-200",
        config.color,
        className
      )}
      data-testid={`badge-status-${status.toLowerCase()}`}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {status}
    </Badge>
  );
}
