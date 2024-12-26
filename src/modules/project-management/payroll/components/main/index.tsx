import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import PayrollTable from "./Table";
import Link from "next/link";
import PayrollSidebar from "./Sidebar";

const Payroll = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium">Payroll</h1>
        <Link href="/admin/project-management/payroll/create">
          <Button variant="default" size="sm">
            <Plus />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-[1fr_300px] gap-x-5">
        <PayrollTable />
        <PayrollSidebar />
      </div>
    </div>
  );
};

export default Payroll;
