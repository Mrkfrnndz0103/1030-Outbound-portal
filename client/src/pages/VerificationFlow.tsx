import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle2, XCircle, AlertTriangle, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pendingRows = [
  {
    id: "DIS-248",
    cluster: "North Cluster",
    station: "Station NC-01",
    dock: "D-12",
    countTO: 45,
    totalOID: 128,
    validation: { success: true, warnings: 0, errors: 0 },
  },
  {
    id: "DIS-247",
    cluster: "South Cluster",
    station: "Station SC-05",
    dock: "D-08",
    countTO: 32,
    totalOID: 96,
    validation: { success: false, warnings: 1, errors: 1 },
  },
  {
    id: "DIS-246",
    cluster: "East Cluster",
    station: "Station EC-12",
    dock: "D-15",
    countTO: 28,
    totalOID: 84,
    validation: { success: true, warnings: 1, errors: 0 },
  },
];

export default function VerificationFlow() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === pendingRows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(pendingRows.map((r) => r.id)));
    }
  };

  const getValidationBadge = (validation: any) => {
    if (validation.errors > 0) {
      return (
        <Badge variant="outline" className="gap-1 bg-destructive/10 text-destructive border-destructive/20">
          <XCircle className="h-3 w-3" />
          {validation.errors} Error{validation.errors !== 1 ? "s" : ""}
        </Badge>
      );
    }
    if (validation.warnings > 0) {
      return (
        <Badge variant="outline" className="gap-1 bg-status-pending/10 text-status-pending border-status-pending/20">
          <AlertTriangle className="h-3 w-3" />
          {validation.warnings} Warning{validation.warnings !== 1 ? "s" : ""}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="gap-1 bg-status-done/10 text-status-done border-status-done/20">
        <CheckCircle2 className="h-3 w-3" />
        Valid
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Verification</h1>
        <p className="text-muted-foreground mt-1">
          Review and verify pending dispatch records
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Pending Verification</h2>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedRows.size === pendingRows.length}
                        onCheckedChange={toggleAll}
                        data-testid="checkbox-verify-all"
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Cluster</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead>Dock</TableHead>
                    <TableHead className="text-right">Count TO</TableHead>
                    <TableHead className="text-right">Total OID</TableHead>
                    <TableHead>Validation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={selectedRows.has(row.id) ? "bg-muted/50" : ""}
                      data-testid={`row-verify-${row.id}`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(row.id)}
                          onCheckedChange={() => toggleSelection(row.id)}
                          data-testid={`checkbox-row-${row.id}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono">{row.id}</TableCell>
                      <TableCell>{row.cluster}</TableCell>
                      <TableCell>{row.station}</TableCell>
                      <TableCell>{row.dock}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.countTO}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.totalOID}</TableCell>
                      <TableCell>{getValidationBadge(row.validation)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {selectedRows.size > 0 && (
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Verification Notes (Optional)</h3>
              <Textarea
                placeholder="Add notes for selected records..."
                value={notes["batch"] || ""}
                onChange={(e) => setNotes({ ...notes, batch: e.target.value })}
                className="min-h-[100px]"
                data-testid="textarea-verification-notes"
              />
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Actions</h3>
            <div className="space-y-2">
              <Button
                className="w-full"
                disabled={selectedRows.size === 0}
                data-testid="button-verify-selected"
              >
                <CheckCircle2 className="h-4 w-4" />
                Verify Selected ({selectedRows.size})
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={selectedRows.size === 0}
                data-testid="button-generate-csv"
              >
                <Download className="h-4 w-4" />
                Generate CSV
              </Button>
              <Button
                variant="outline"
                className="w-full text-destructive hover:text-destructive"
                disabled={selectedRows.size === 0}
                data-testid="button-reject-selected"
              >
                <XCircle className="h-4 w-4" />
                Reject Selected
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3">Validation Summary</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Total Records</dt>
                <dd className="font-semibold tabular-nums">{pendingRows.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Valid</dt>
                <dd className="font-semibold text-status-done tabular-nums">
                  {pendingRows.filter((r) => r.validation.success && r.validation.warnings === 0).length}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Warnings</dt>
                <dd className="font-semibold text-status-pending tabular-nums">
                  {pendingRows.filter((r) => r.validation.warnings > 0 && r.validation.errors === 0).length}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Errors</dt>
                <dd className="font-semibold text-destructive tabular-nums">
                  {pendingRows.filter((r) => r.validation.errors > 0).length}
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
