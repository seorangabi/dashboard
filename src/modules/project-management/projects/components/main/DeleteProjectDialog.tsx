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
import useDeleteProjectMutation from "@/common/mutations/deleteProjectMutation";
import { Project } from "@/common/types/project";
import { LoaderCircle, Trash } from "lucide-react";
import React, { FC } from "react";
import { toast } from "sonner";

const DeleteProjectDialog: FC<{
  project: Project | undefined;
  onSuccess?: () => void;
}> = ({ project, onSuccess }) => {
  const { mutateAsync, isPending } = useDeleteProjectMutation({});

  const handleDelete = async () => {
    try {
      if (!project) throw new Error("Project not found");
      await mutateAsync({ id: project.id });

      toast.success("Project deleted successfully");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          disabled={project?.status !== "OFFERING"}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete your project!
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

export default DeleteProjectDialog;
