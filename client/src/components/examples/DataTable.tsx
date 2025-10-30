import { DataTable } from "../DataTable";
import { StatusBadge, type DispatchStatus } from "../StatusBadge";

const mockData = [
  {
    id: "DIS-001",
    cluster: "North Cluster",
    station: "Station A",
    dock: "D-12",
    status: "Pending" as DispatchStatus,
    opsName: "Juan Dela Cruz",
  },
  {
    id: "DIS-002",
    cluster: "South Cluster",
    station: "Station B",
    dock: "D-08",
    status: "Ongoing" as DispatchStatus,
    opsName: "Maria Santos",
  },
  {
    id: "DIS-003",
    cluster: "East Cluster",
    station: "Station C",
    dock: "D-15",
    status: "Done" as DispatchStatus,
    opsName: "Pedro Garcia",
  },
];

export default function DataTableExample() {
  const columns = [
    { key: "id", label: "Dispatch ID", sortable: true, className: "font-mono" },
    { key: "cluster", label: "Cluster", sortable: true },
    { key: "station", label: "Station", sortable: true },
    { key: "dock", label: "Dock", sortable: false },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row: any) => <StatusBadge status={row.status} />,
    },
    { key: "opsName", label: "OPS Assigned" },
  ];

  return (
    <DataTable
      columns={columns}
      data={mockData}
      selectable
      onRowClick={(row) => console.log("Row clicked:", row)}
      onSelectionChange={(ids) => console.log("Selected:", ids)}
      getRowId={(row) => row.id}
    />
  );
}
