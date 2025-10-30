import { FilterBar } from "../FilterBar";

export default function FilterBarExample() {
  const quickFilters = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "Pending", value: "pending" },
    { label: "Verified", value: "verified" },
  ];

  return (
    <FilterBar
      onSearch={(query) => console.log("Search:", query)}
      onFilterChange={(filters) => console.log("Filters:", filters)}
      quickFilters={quickFilters}
    />
  );
}
