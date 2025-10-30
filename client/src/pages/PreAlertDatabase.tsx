import { useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge, type DispatchStatus } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const mockData = [
  {
    id: "DIS-248",
    batchLabel: "BATCH-001",
    cluster: "North Cluster Alpha",
    station: "Station NC-01",
    dock: "D-12",
    countTO: 45,
    totalOID: 128,
    processor: "Processor A",
    plateNumber: "ABC-1234",
    status: "Pending" as DispatchStatus,
    opsName: "Juan Dela Cruz",
    createdAt: "2025-10-30 14:30",
  },
  {
    id: "DIS-247",
    batchLabel: "BATCH-001",
    cluster: "South Cluster Beta",
    station: "Station SC-05",
    dock: "D-08",
    countTO: 32,
    totalOID: 96,
    processor: "Processor B",
    plateNumber: "XYZ-5678",
    status: "Ongoing" as DispatchStatus,
    opsName: "Maria Santos",
    createdAt: "2025-10-30 14:15",
  },
  {
    id: "DIS-246",
    batchLabel: "BATCH-002",
    cluster: "East Cluster Gamma",
    station: "Station EC-12",
    dock: "D-15",
    countTO: 28,
    totalOID: 84,
    processor: "Processor C",
    plateNumber: "DEF-9012",
    status: "Done" as DispatchStatus,
    opsName: "Pedro Garcia",
    createdAt: "2025-10-30 13:45",
  },
  {
    id: "DIS-245",
    batchLabel: "BATCH-002",
    cluster: "West Cluster Delta",
    station: "Station WC-08",
    dock: "D-22",
    countTO: 51,
    totalOID: 153,
    processor: "Processor A",
    plateNumber: "GHI-3456",
    status: "Pending" as DispatchStatus,
    opsName: "Ana Reyes",
    createdAt: "2025-10-30 13:20",
  },
  {
    id: "DIS-244",
    batchLabel: "BATCH-003",
    cluster: "North Cluster Alpha",
    station: "Station NC-03",
    dock: "D-18",
    countTO: 39,
    totalOID: 117,
    processor: "Processor B",
    plateNumber: "JKL-7890",
    status: "Done" as DispatchStatus,
    opsName: "Carlos Lopez",
    createdAt: "2025-10-30 12:50",
  },
];

export default function PreAlertDatabase() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const columns: Column<typeof mockData[0]>[] = [
    { key: "id", label: "Dispatch ID", sortable: true, className: "font-mono" },
    { key: "batchLabel", label: "Batch", sortable: true, className: "font-mono text-xs" },
    { key: "cluster", label: "Cluster", sortable: true },
    { key: "station", label: "Station", sortable: true },
    { key: "dock", label: "Dock" },
    { key: "countTO", label: "Count TO", sortable: true, className: "tabular-nums" },
    { key: "totalOID", label: "Total OID", sortable: true, className: "tabular-nums" },
    { key: "processor", label: "Processor" },
    { key: "plateNumber", label: "Plate #", className: "font-mono text-xs" },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "opsName", label: "OPS Assigned" },
    { key: "createdAt", label: "Created", className: "font-mono text-xs text-muted-foreground" },
  ];

  const quickFilters = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "Pending", value: "pending" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Verified", value: "verified" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pre-Alert Database</h1>
          <p className="text-muted-foreground mt-1">
            Search, filter, and manage all dispatch records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-export-csv">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" data-testid="button-import-csv">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
        </div>
      </div>

      <FilterBar
        onSearch={(query) => console.log("Search:", query)}
        onFilterChange={(filters) => console.log("Filters:", filters)}
        quickFilters={quickFilters}
      />

      <DataTable
        columns={columns}
        data={mockData}
        selectable
        onRowClick={(row) => console.log("View dispatch:", row)}
        onSelectionChange={setSelectedRows}
        getRowId={(row) => row.id}
      />

      {selectedRows.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-in">
          <div className="bg-card border rounded-lg shadow-xl p-4 flex items-center gap-4">
            <span className="font-medium">{selectedRows.length} selected</span>
            <div className="flex gap-2">
              <Button size="sm" data-testid="button-batch-verify">Verify Selected</Button>
              <Button size="sm" variant="outline" data-testid="button-generate-csv">Generate CSV</Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedRows([])}
                data-testid="button-clear-selection"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
