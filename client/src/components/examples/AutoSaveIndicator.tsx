import { AutoSaveIndicator } from "../AutoSaveIndicator";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AutoSaveIndicatorExample() {
  const [status, setStatus] = useState<"saving" | "saved" | "error">("saved");

  const triggerSave = () => {
    setStatus("saving");
    setTimeout(() => setStatus("saved"), 1500);
  };

  const triggerError = () => {
    setStatus("error");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button onClick={triggerSave} size="sm" data-testid="button-trigger-save">
          Trigger Save
        </Button>
        <Button onClick={triggerError} size="sm" variant="destructive" data-testid="button-trigger-error">
          Trigger Error
        </Button>
      </div>
      <AutoSaveIndicator status={status} />
    </div>
  );
}
