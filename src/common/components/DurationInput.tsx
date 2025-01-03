import { milliseconds } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";

import { Button } from "@/common/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DurationInputProps {
  duration: number; // milliseconds
  onDurationChange: (newDuration: number) => void;
  classNames?: {
    popoverContent?: string;
  };
}

const DurationInput = ({
  duration,
  onDurationChange,
  classNames,
}: DurationInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderDuration = () => {
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes`;
  };

  const hours24 = Array.from({ length: 24 }, (_, i) => i);
  const minutes60 = Array.from({ length: 60 }, (_, i) => i);

  const selectedHours = Math.floor(duration / (1000 * 60 * 60));
  const selectedMinutes = Math.floor(
    (duration % (1000 * 60 * 60)) / (1000 * 60)
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !duration && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {renderDuration()}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "p-1 flex items-center gap-x-3",
          classNames?.popoverContent
        )}
      >
        <Select
          value={selectedHours ? `${selectedHours}` : undefined}
          onValueChange={(value) => {
            const hours = parseInt(value);
            const minutes = selectedMinutes || 0;
            const newDuration = milliseconds({
              hours,
              minutes,
            });
            onDurationChange(newDuration);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Hours" />
          </SelectTrigger>
          <SelectContent>
            {hours24.map((hour) => (
              <SelectItem
                key={hour}
                value={`${hour}`}
              >{`${hour} hours`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedMinutes ? `${selectedMinutes}` : undefined}
          onValueChange={(value) => {
            const hours = selectedHours || 0;
            const minutes = parseInt(value);
            const newDuration = milliseconds({
              hours,
              minutes,
            });
            onDurationChange(newDuration);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Minutes" />
          </SelectTrigger>
          <SelectContent>
            {minutes60.map((minute) => (
              <SelectItem
                key={minute}
                value={`${minute}`}
              >{`${minute} minutes`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
};

export default DurationInput;
