import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type UserRole = "BACKROOM" | "DATA" | "FTE" | "ADMIN";

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const roleConfig = {
    BACKROOM: {
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      label: "Backroom OPS",
    },
    DATA: {
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      label: "Data Team",
    },
    FTE: {
      color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      label: "FTE",
    },
    ADMIN: {
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      label: "Admin",
    },
  };

  const config = roleConfig[role];

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-semibold transition-colors duration-200",
        config.color,
        className
      )}
      data-testid={`badge-role-${role.toLowerCase()}`}
    >
      {config.label}
    </Badge>
  );
}
