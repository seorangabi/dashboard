import React from "react";
import ImagePerWeekChart from "./ImagePerWeekChart";

const Statistics = () => {
  return (
    <div>
      <div className="border rounded-md">
        <div className="border-b grid grid-cols-[1fr_300px] items-center">
          <div className="flex-1 border-r py-10 flex items-center justify-center">
            Produksi Gambar Mingguan Per Team
          </div>
          <div className="flex items-center justify-center">300</div>
        </div>
        <div className="p-4">
          <ImagePerWeekChart />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
