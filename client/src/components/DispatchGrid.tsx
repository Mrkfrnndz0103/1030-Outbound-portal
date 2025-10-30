import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Download, Upload, Eye, EyeOff } from "lucide-react";
import { AutoSaveIndicator } from "./AutoSaveIndicator";
import { cn } from "@/lib/utils";

interface GridColumn {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "datetime";
  options?: string[];
  hidden?: boolean;
}

const defaultColumns: GridColumn[] = [
  { key: "cluster", label: "Cluster", type: "select", options: ["North Cluster", "South Cluster", "East Cluster"] },
  { key: "station", label: "Station", type: "text" },
  { key: "dock", label: "Dock", type: "text" },
  { key: "countTO", label: "Count TO", type: "number" },
  { key: "totalOID", label: "Total OID", type: "number" },
  { key: "processor", label: "Processor", type: "text" },
  { key: "plateNumber", label: "Plate #", type: "text" },
  { key: "opsAssigned", label: "OPS Assigned", type: "text" },
];

export function DispatchGrid() {
  const [rows, setRows] = useState<Record<string, any>[]>([
    { id: "1", cluster: "", station: "", dock: "", countTO: "", totalOID: "", processor: "", plateNumber: "", opsAssigned: "" },
  ]);
  const [columns, setColumns] = useState(defaultColumns);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "error">("saved");
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  const addRow = () => {
    if (rows.length >= 10) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("saved"), 2000);
      return;
    }
    const newRow: Record<string, any> = { id: Date.now().toString() };
    columns.forEach((col) => {
      newRow[col.key] = "";
    });
    setRows([...rows, newRow]);
    simulateSave();
  };

  const removeRow = (id: string) => {
    setRows(rows.filter((r) => r.id !== id));
    simulateSave();
  };

  const updateCell = (rowId: string, columnKey: string, value: any) => {
    setRows(
      rows.map((row) => (row.id === rowId ? { ...row, [columnKey]: value } : row))
    );
    simulateSave();
  };

  const simulateSave = () => {
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("saved"), 800);
  };

  const toggleColumnVisibility = (key: string) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, hidden: !col.hidden } : col
      )
    );
  };

  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={addRow}
              disabled={rows.length >= 10}
              size="sm"
              data-testid="button-add-row"
            >
              <Plus className="h-4 w-4" />
              Add Row ({rows.length}/10)
            </Button>
            <Button variant="outline" size="sm" data-testid="button-export-draft">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" data-testid="button-import-draft">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowColumnToggle(!showColumnToggle)}
              data-testid="button-toggle-columns"
            >
              {showColumnToggle ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              Columns
            </Button>
          </div>
          <AutoSaveIndicator status={saveStatus} />
        </div>

        {showColumnToggle && (
          <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg animate-fade-in">
            {columns.map((col) => (
              <Button
                key={col.key}
                variant={col.hidden ? "outline" : "secondary"}
                size="sm"
                onClick={() => toggleColumnVisibility(col.key)}
                data-testid={`button-toggle-column-${col.key}`}
              >
                {col.hidden ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                {col.label}
              </Button>
            ))}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="sticky top-0 bg-muted/50 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide w-12">
                  #
                </th>
                {visibleColumns.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide min-w-[150px]"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 w-12" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-t transition-colors duration-150",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  )}
                  data-testid={`grid-row-${index}`}
                >
                  <td className="px-4 py-2 text-sm text-muted-foreground">
                    {index + 1}
                  </td>
                  {visibleColumns.map((col) => (
                    <td key={col.key} className="px-3 py-2">
                      {col.type === "select" ? (
                        <Select
                          value={row[col.key]}
                          onValueChange={(value) => updateCell(row.id, col.key, value)}
                        >
                          <SelectTrigger
                            className="h-9 border-0 focus:ring-2 focus:ring-ring"
                            data-testid={`select-${col.key}-${index}`}
                          >
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {col.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={col.type === "number" ? "number" : "text"}
                          value={row[col.key]}
                          onChange={(e) => updateCell(row.id, col.key, e.target.value)}
                          className="h-9 border-0 focus-visible:ring-2 focus-visible:ring-ring"
                          placeholder={`Enter ${col.label.toLowerCase()}`}
                          data-testid={`input-${col.key}-${index}`}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(row.id)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      data-testid={`button-delete-row-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? "row" : "rows"} • Max 10 rows per session
          </p>
          <Button size="lg" className="px-8" data-testid="button-submit-rows">
            Submit Rows
          </Button>
        </div>
      </div>
    </Card>
  );
}
