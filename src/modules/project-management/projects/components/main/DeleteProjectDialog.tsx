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
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { generateErrorMessage } from "@/common/lib/utils";
import useDeleteProjectMutation from "@/common/mutations/useDeleteProjectMutation";
import type { Project } from "@/common/types/project";
import { LoaderCircle, Trash } from "lucide-react";
import { useRef, type FC } from "react";
import { toast } from "sonner";

const DeleteProjectDialog: FC<{
	project: Project | undefined;
	onSuccess?: () => void;
}> = ({ project, onSuccess }) => {
	const deleteThreadRef = useRef<HTMLButtonElement>(null);
	const { mutateAsync, isPending } = useDeleteProjectMutation({});

	const handleDelete = async () => {
		try {
			if (!project) throw new Error("Project not found");

			const deleteThread = deleteThreadRef.current?.dataset.state === "checked";

			await mutateAsync({ id: project.id, deleteThread });

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
					disabled={
						project?.status !== "OFFERING" && project?.status !== "DRAFT"
					}
				>
					<Trash />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-[425px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will delete your project!
						<div className="flex items-center space-x-2 mt-2">
							<Switch
								ref={deleteThreadRef}
								id="delete-thread"
								defaultChecked={true}
							/>
							<Label htmlFor="delete-thread">
								delete discord thread if any
							</Label>
						</div>
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
