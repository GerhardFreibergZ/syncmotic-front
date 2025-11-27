import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mesesData } from "@/data/mockData";

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (value: string) => void;
}

export function MonthSelector({
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-5 w-5 text-muted-foreground" />
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Seleccionar mes" />
        </SelectTrigger>
        <SelectContent>
          {mesesData.map((mes) => (
            <SelectItem
              key={`${mes.mes}-${mes.year}`}
              value={`${mes.mes}-${mes.year}`}
            >
              {mes.mes} {mes.year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
