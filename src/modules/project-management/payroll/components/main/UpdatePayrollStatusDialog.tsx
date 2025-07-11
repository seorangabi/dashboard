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
import useUpdatePayrollMutation from "@/common/mutations/useUpdatePayrollMutation";
import { LoaderCircle, Pencil } from "lucide-react";
import type { FC } from "react";
import { toast } from "sonner";

const UpdatePayrollStatusDialog: FC<{ id: string }> = ({ id }) => {
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
						{isPending && <LoaderCircle className="animate-spin" />}
						Yes
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default UpdatePayrollStatusDialog;
