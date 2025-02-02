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
import useDeletePayrollMutation from "@/common/mutations/useDeletePayrollMutation";
import { LoaderCircle, Trash } from "lucide-react";
import type { FC } from "react";
import { toast } from "sonner";

const DeletePayrollDialog: FC<{ id: string; disabled?: boolean }> = ({
	id,
	disabled,
}) => {
	const { mutateAsync, isPending } = useDeletePayrollMutation({});

	const handleDelete = async () => {
		try {
			await mutateAsync({ id });

			toast.success("Payroll deleted successfully");
		} catch (error) {
			console.error(error);
			toast.error(generateErrorMessage(error));
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="default" size="sm" disabled={disabled}>
					<Trash />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-[425px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will delete your payroll!
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

export default DeletePayrollDialog;
