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
import { type FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pencil } from "lucide-react";

import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useUpdateProjectMutation from "@/common/mutations/useUpdateProjectMutation";
import { ProjectStatus, type Project } from "@/common/types/project";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select";
import { PROJECT_STATUS_LABEL } from "../../constants";

const formSchema = z.object({
	status: z.nativeEnum(ProjectStatus),
});

type StatusOption = {
	status: ProjectStatus;
	label?: string; // Optional custom label override
};

const statusMap: Record<ProjectStatus, StatusOption[]> = {
	[ProjectStatus.DRAFT]: [
		{ status: ProjectStatus.OFFERING },
		{ status: ProjectStatus.CANCELLED },
	],
	[ProjectStatus.OFFERING]: [
		{ status: ProjectStatus.IN_PROGRESS },
		{ status: ProjectStatus.CANCELLED },
	],
	[ProjectStatus.IN_PROGRESS]: [
		{ status: ProjectStatus.SUBMITTED },
		{ status: ProjectStatus.CANCELLED },
	],
	[ProjectStatus.SUBMITTED]: [
		{ status: ProjectStatus.IN_PROGRESS, label: "Revert To In Progress" },
		{ status: ProjectStatus.DONE },
		{ status: ProjectStatus.CANCELLED },
	],
	[ProjectStatus.DONE]: [],
	[ProjectStatus.CANCELLED]: [],
};

const UpdateProjectStatusDialog: FC<{ project: Project | undefined }> = ({
	project,
}) => {
	const [open, setOpen] = useState(false);
	const { mutateAsync, isPending } = useUpdateProjectMutation({});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			status: project?.status,
		},
	});

	const options = useMemo(() => {
		if (!project?.status) return [];

		const temp: {
			label: string;
			value: Project["status"];
		}[] = [];

		// Get allowed next statuses from the statusMap
		const allowedStatusOptions = statusMap[project.status];

		// Process each allowed status
		for (const option of allowedStatusOptions) {
			temp.push({
				// Use custom label if provided, otherwise use default label
				label: option.label || PROJECT_STATUS_LABEL[option.status],
				value: option.status,
			});
		}

		return temp;
	}, [project?.status]);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (!project) throw new Error("Project not found");

			await mutateAsync({
				id: project?.id || "",
				...values,
			});

			toast.success("Project status updated successfully");
			form.reset();
			setOpen(false);
		} catch (error) {
			console.error(error);
			toast.error(generateErrorMessage(error));
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (open) {
					form.reset({
						status: project?.status,
					});
				}

				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="link"
					size="sm"
					disabled={
						project?.status === ProjectStatus.CANCELLED ||
						project?.status === ProjectStatus.DONE
					}
				>
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<DialogHeader>
							<DialogTitle>Update Status</DialogTitle>
						</DialogHeader>

						<div className="space-y-3">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{options.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isPending}>
								{isPending && <LoaderCircle className="animate-spin" />}
								Update
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateProjectStatusDialog;
