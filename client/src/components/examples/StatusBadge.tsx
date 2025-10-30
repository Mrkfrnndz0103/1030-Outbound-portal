import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-3">
      <StatusBadge status="Pending" />
      <StatusBadge status="Ongoing" />
      <StatusBadge status="Done" />
    </div>
  );
}
