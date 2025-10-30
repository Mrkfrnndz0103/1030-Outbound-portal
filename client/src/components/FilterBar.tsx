import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter, Calendar } from "lucide-react";
import { useState } from "react";

interface FilterChip {
  id: string;
  label: string;
  value: string;
}

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterChip[]) => void;
  quickFilters?: { label: string; value: string }[];
}

export function FilterBar({ onSearch, onFilterChange, quickFilters = [] }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const addFilter = (label: string, value: string) => {
    const newFilter = { id: Math.random().toString(), label, value };
    const updated = [...activeFilters, newFilter];
    setActiveFilters(updated);
    onFilterChange?.(updated);
  };

  const removeFilter = (id: string) => {
    const updated = activeFilters.filter((f) => f.id !== id);
    setActiveFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[320px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search dispatches..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
        <Button variant="outline" size="default" data-testid="button-add-filter">
          <Filter className="h-4 w-4" />
          Add Filter
        </Button>
        <Button variant="outline" size="icon" data-testid="button-calendar">
          <Calendar className="h-4 w-4" />
        </Button>
      </div>

      {quickFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <Button
              key={filter.value}
              variant="outline"
              size="sm"
              onClick={() => addFilter(filter.label, filter.value)}
              className="h-8"
              data-testid={`button-quick-filter-${filter.value}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="gap-1 pr-1"
              data-testid={`chip-filter-${filter.value}`}
            >
              {filter.label}: {filter.value}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full hover:bg-destructive/20"
                onClick={() => removeFilter(filter.id)}
                data-testid={`button-remove-filter-${filter.id}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
