import { RoleBadge } from "../RoleBadge";

export default function RoleBadgeExample() {
  return (
    <div className="flex gap-3">
      <RoleBadge role="BACKROOM" />
      <RoleBadge role="DATA" />
      <RoleBadge role="FTE" />
      <RoleBadge role="ADMIN" />
    </div>
  );
}
