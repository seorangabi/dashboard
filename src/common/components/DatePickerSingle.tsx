import { cn } from "@/common/lib/utils";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { FC, useState } from "react";
import { format } from "date-fns";

const DatePickerSingle: FC<{
  dateFormat?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}> = ({ dateFormat = "dd/MM/yyyy", date, setDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, dateFormat ?? "dd/MM/yyyy")
          ) : (
            <span>{dateFormat}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerSingle;
