import { Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type SaveStatus = "saving" | "saved" | "error";

interface AutoSaveIndicatorProps {
  status: SaveStatus;
  className?: string;
}

export function AutoSaveIndicator({ status, className }: AutoSaveIndicatorProps) {
  const config = {
    saving: {
      icon: Loader2,
      text: "Saving...",
      color: "text-muted-foreground",
      iconClass: "animate-spin",
    },
    saved: {
      icon: Check,
      text: "Saved",
      color: "text-status-done",
      iconClass: "animate-fade-in",
    },
    error: {
      icon: AlertCircle,
      text: "Error",
      color: "text-destructive",
      iconClass: "animate-shake",
    },
  };

  const { icon: Icon, text, color, iconClass } = config[status];

  return (
    <div
      className={cn("flex items-center gap-2 text-sm font-medium", color, className)}
      data-testid="autosave-indicator"
    >
      <Icon className={cn("h-4 w-4", iconClass)} />
      <span>{text}</span>
    </div>
  );
}
