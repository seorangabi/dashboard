import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/common/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/common/components/ui/form";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import { Textarea } from "@/common/components/ui/textarea";

import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useCreateTaskMutation from "@/common/mutations/useCreateTaskMutation";
import CurrencyInput from "@/common/components/CurrencyInput";
import MultipleImageUploader from "@/common/components/MultipleImageUploader";

const formSchema = z.object({
	fee: z.number(),
	note: z.string(),
	attachments: z.array(z.string()),
});

const CreateTaskDialog: FC<{
	projectId: string;
	onSuccess?: () => void;
	nextTaskNumber: number;
}> = ({ projectId, nextTaskNumber, onSuccess }) => {
	const [open, setOpen] = useState(false);
	const { mutateAsync, isPending } = useCreateTaskMutation({});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			attachments: [],
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await mutateAsync({
				projectId,
				fee: values.fee,
				note: values.note,
				imageCount: 1,
				taskNumber: nextTaskNumber,
				attachments: values.attachments,
			});

			toast.success("Task created successfully");
			setOpen(false);
			onSuccess?.();
		} catch (error) {
			console.error(error);
			toast.error(generateErrorMessage(error));
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(newOpen) => {
				if (newOpen)
					form.reset({
						note: "",
						fee: 0,
						attachments: [],
					});

				setOpen(newOpen);
			}}
		>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px] overflow-y-scroll max-h-[80%]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<DialogHeader>
							<DialogTitle>Create Task</DialogTitle>
						</DialogHeader>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
							<div className="space-y-3">
								<FormField
									control={form.control}
									name="fee"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Fee*</FormLabel>
											<FormControl>
												<CurrencyInput
													placeholder="200.000"
													{...field}
													onChange={(value) => field.onChange(value)}
													value={field.value}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="note"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Note</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Note"
													className="resize-none min-h-60"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="attachments"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Picture</FormLabel>
										<FormControl>
											<MultipleImageUploader
												value={value}
												onChange={(value) => {
													onChange(value);
													form.clearErrors("attachments");
												}}
												onError={(error) => {
													form.setError("attachments", {
														type: "manual",
														message: generateErrorMessage(error),
													});
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isPending}>
								{isPending && <LoaderCircle className="animate-spin" />}
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateTaskDialog;
