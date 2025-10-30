import { DispatchGrid } from "@/components/DispatchGrid";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Keyboard } from "lucide-react";

export default function SubmitReport() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit Report</h1>
        <p className="text-muted-foreground mt-1">
          Enter dispatch details using the spreadsheet interface
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Alert className="lg:col-span-2">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Changes are auto-saved to local storage. Maximum 10 rows per submission session.
            Use Tab to navigate between cells.
          </AlertDescription>
        </Alert>

        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Keyboard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Keyboard Shortcuts</h3>
              <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Tab</dt>
                  <dd className="font-mono">Next cell</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shift + Tab</dt>
                  <dd className="font-mono">Previous cell</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Enter</dt>
                  <dd className="font-mono">Next row</dd>
                </div>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      <DispatchGrid />
    </div>
  );
}
