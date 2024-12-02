import React, { useState } from "react";
import ImagePerWeekChart from "./ImagePerWeekChart";
import MonthPickerInput from "@/common/components/MonthPickerInput";
import useImageProductionPerWeekQuery from "@/common/queries/imageProductionPerWeekQuery";
import { Skeleton } from "@/common/components/ui/skeleton";
import { cn } from "@/common/lib/utils";

const Statistics = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { data: imageProductionPerWeekData, isLoading } =
    useImageProductionPerWeekQuery({
      query: {
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
      },
      options: {
        enabled: !!date,
      },
    });

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
          {!!imageProductionPerWeekData?.data?.docs?.length &&
            !isLoading &&
            imageProductionPerWeekData?.data.docs.map((week, index) => {
              const currentIsEven = index % 2 === 0;

              const totalIsEven =
                imageProductionPerWeekData.data.docs.length % 2 === 0;
              const showBorderBottom = !(totalIsEven
                ? index === imageProductionPerWeekData.data.docs.length - 1 ||
                  index === imageProductionPerWeekData.data.docs.length - 2
                : index === imageProductionPerWeekData.data.docs.length - 1);

              return (
                <ImagePerWeekChart
                  key={week.start}
                  label={`week ${index + 1}`}
                  data={week}
                  className={cn("border-b", {
                    "border-r": currentIsEven,
                    "border-b": showBorderBottom,
                  })}
                />
              );
            })}

          {isLoading && (
            <>
              <Skeleton className="h-[250px] m-2" />
              <Skeleton className="h-[250px] m-2" />
              <Skeleton className="h-[250px] m-2" />
              <Skeleton className="h-[250px] m-2" />
              <Skeleton className="h-[250px] m-2" />
              <Skeleton className="h-[250px] m-2" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
