import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/ui/alert-dialog";
import { Button } from "@/common/components/ui/button";
import { generateErrorMessage } from "@/common/lib/utils";
import useDeletePayrollMutation from "@/common/mutations/deletePayrollMutation";
import useUpdatePayrollMutation from "@/common/mutations/updatePayrollMutation";
import { Pencil, Trash } from "lucide-react";
import React, { FC } from "react";
import { toast } from "sonner";

const UpdateStatusDialog: FC<{ id: string }> = ({ id }) => {
  const { mutateAsync, isPending } = useUpdatePayrollMutation({});

  const handleUpdate = async () => {
    try {
      await mutateAsync({ id, status: "PAID" });

      toast.success("Payroll updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm">
          <Pencil className="text-xs" size={6} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will update your payroll status to Paid
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate} disabled={isPending}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateStatusDialog;
