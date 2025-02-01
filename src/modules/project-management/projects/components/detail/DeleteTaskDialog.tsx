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
import useDeleteTaskMutation from "@/common/mutations/useDeleteTaskMutation";
import type { Task } from "@/common/types/task";
import { LoaderCircle, Trash } from "lucide-react";
import React, { type FC } from "react";
import { toast } from "sonner";

const DeleteTaskDialog: FC<{
	task: Task | undefined;
	onSuccess?: () => void;
}> = ({ task, onSuccess }) => {
	const { mutateAsync, isPending } = useDeleteTaskMutation({});

	const handleDelete = async () => {
		try {
			if (!task) throw new Error("Task not found");
			await mutateAsync({ id: task.id });

			toast.success("Task deleted successfully");
			onSuccess?.();
		} catch (error) {
			console.error(error);
			toast.error(generateErrorMessage(error));
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="secondary" size="sm">
					<Trash />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-[425px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will delete your task!
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

export default DeleteTaskDialog;
