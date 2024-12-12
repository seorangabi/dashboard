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
import useDeleteTeamMutation from "@/common/mutations/deleteTeamMutation";
import { LoaderCircle, Trash } from "lucide-react";
import React, { FC } from "react";
import { toast } from "sonner";

const DeleteTeamDialog: FC<{ id: string }> = ({ id }) => {
  const { mutateAsync, isPending } = useDeleteTeamMutation({});

  const handleDelete = async () => {
    try {
      await mutateAsync({ id });

      toast.success("Project deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete your team!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending && <LoaderCircle className="animate-spin" />}
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTeamDialog;
