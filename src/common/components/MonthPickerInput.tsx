import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";

import { Button } from "@/common/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { useState } from "react";
import MonthPicker from "./MonthPicker";

interface MonthPickerInputProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

const MonthPickerInput = ({
  currentMonth,
  onMonthChange,
}: MonthPickerInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !currentMonth && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {currentMonth ? (
            format(currentMonth, "MMMM yyyy")
          ) : (
            <span>{"Select a month"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker
          currentMonth={currentMonth}
          onMonthChange={onMonthChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MonthPickerInput;
