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
import React, { type FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pencil } from "lucide-react";

import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useUpdateProjectMutation from "@/common/mutations/updateProjectMutation";
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

		const keys = Object.keys(ProjectStatus) as ProjectStatus[];

		for (const key of keys) {
			if (
				project.status !== ProjectStatus.OFFERING &&
				key === ProjectStatus.OFFERING
			)
				continue;

			temp.push({
				label: PROJECT_STATUS_LABEL[key],
				value: key,
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
						project?.status === ProjectStatus.DONE ||
						project?.status === ProjectStatus.CANCELLED
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
