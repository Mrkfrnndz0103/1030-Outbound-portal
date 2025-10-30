import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  getRowId?: (row: T) => string;
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  selectable = false,
  onSelectionChange,
  getRowId = (row: any) => row.id,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const toggleAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
      onSelectionChange?.([]);
    } else {
      const allIds = new Set(data.map(getRowId));
      setSelectedIds(allIds);
      onSelectionChange?.(Array.from(allIds));
    }
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.size === data.length && data.length > 0}
                  onCheckedChange={toggleAll}
                  data-testid="checkbox-select-all"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.sortable ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort(column.key)}
                    className="-ml-3 h-8 hover-elevate"
                    data-testid={`button-sort-${column.key}`}
                  >
                    {column.label}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 2 : 1)}
                className="h-24 text-center"
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Eye className="h-8 w-8" />
                  <p>No records found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              const rowId = getRowId(row);
              const isSelected = selectedIds.has(rowId);
              const isExpanded = expandedRow === rowId;

              return (
                <TableRow
                  key={rowId}
                  className={cn(
                    "transition-colors duration-150",
                    isSelected && "bg-muted/50",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                  data-testid={`row-${rowId}`}
                >
                  {selectable && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelection(rowId)}
                        data-testid={`checkbox-row-${rowId}`}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {column.render
                        ? column.render(row)
                        : (row as any)[column.key]?.toString() ?? "-"}
                    </TableCell>
                  ))}
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setExpandedRow(isExpanded ? null : rowId)}
                      data-testid={`button-actions-${rowId}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
