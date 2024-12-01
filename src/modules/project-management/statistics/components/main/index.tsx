import React, { useState } from "react";
import ImagePerWeekChart from "./ImagePerWeekChart";
import MonthPickerInput from "@/common/components/MonthPickerInput";

const Statistics = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div>
      <div className="border rounded-md">
        <div className="border-b grid grid-cols-[1fr_300px] items-center">
          <div className="flex-1 border-r py-10 px-6 flex">
            <div className="text-2xl font-semibold">
              Image Production Per Week
            </div>
            <div className="ml-5 w-[200px]">
              <MonthPickerInput currentMonth={date} onMonthChange={setDate} />
            </div>
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="text-2xl font-semibold">300</div>
            <div className="text-muted-foreground">Overall Image</div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <ImagePerWeekChart label="week 1" className="border-r border-b" />
          <ImagePerWeekChart label="week 2" className="border-b" />
          <ImagePerWeekChart label="week 3" className="border-r" />
          <ImagePerWeekChart label="week 4" />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
