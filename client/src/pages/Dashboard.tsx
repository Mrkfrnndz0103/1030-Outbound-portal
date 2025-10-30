import { DashboardStatCard } from "@/components/DashboardStatCard";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge, type DispatchStatus } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const recentDispatches = [
  {
    id: "DIS-248",
    cluster: "North Cluster Alpha",
    station: "Station NC-01",
    dock: "D-12",
    status: "Pending" as DispatchStatus,
    opsName: "Juan Dela Cruz",
    timestamp: "10 mins ago",
  },
  {
    id: "DIS-247",
    cluster: "South Cluster Beta",
    station: "Station SC-05",
    dock: "D-08",
    status: "Ongoing" as DispatchStatus,
    opsName: "Maria Santos",
    timestamp: "25 mins ago",
  },
  {
    id: "DIS-246",
    cluster: "East Cluster Gamma",
    station: "Station EC-12",
    dock: "D-15",
    status: "Done" as DispatchStatus,
    opsName: "Pedro Garcia",
    timestamp: "1 hour ago",
  },
  {
    id: "DIS-245",
    cluster: "West Cluster Delta",
    station: "Station WC-08",
    dock: "D-22",
    status: "Pending" as DispatchStatus,
    opsName: "Ana Reyes",
    timestamp: "2 hours ago",
  },
];

export default function Dashboard() {
  const columns: Column<typeof recentDispatches[0]>[] = [
    { key: "id", label: "ID", sortable: true, className: "font-mono" },
    { key: "cluster", label: "Cluster", sortable: true },
    { key: "station", label: "Station", sortable: true },
    { key: "dock", label: "Dock" },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "opsName", label: "OPS Assigned" },
    { key: "timestamp", label: "Time", className: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of outbound dispatch operations
        </p>
      </div>

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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Latest dispatch submissions</p>
          </div>
          <Link href="/database">
            <Button variant="outline" data-testid="button-view-all">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={recentDispatches}
          onRowClick={(row) => console.log("View dispatch:", row)}
        />
      </div>
    </div>
  );
}
