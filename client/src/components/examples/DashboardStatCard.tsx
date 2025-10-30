import { DashboardStatCard } from "../DashboardStatCard";
import { FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function DashboardStatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardStatCard
        label="Total Dispatches"
        value="1,247"
        icon={FileText}
        trend={{ value: 12, isPositive: true }}
      />
      <DashboardStatCard
        label="Verified"
        value="892"
        icon={CheckCircle2}
        accentColor="bg-status-done"
        trend={{ value: 8, isPositive: true }}
      />
      <DashboardStatCard
        label="Pending"
        value="248"
        icon={Clock}
        accentColor="bg-status-pending"
      />
      <DashboardStatCard
        label="Needs Review"
        value="107"
        icon={AlertCircle}
        accentColor="bg-destructive"
        trend={{ value: 3, isPositive: false }}
      />
    </div>
  );
}
