import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import PayrollTable from "./Table";
import Link from "next/link";

const Payroll = () => {
  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium">Payroll</h1>
        <Link href="/admin/project-management/payroll/create">
          <Button variant="default" size="sm">
            <Plus />
          </Button>
        </Link>
      </div>
      <PayrollTable />
    </div>
  );
};

export default Payroll;
