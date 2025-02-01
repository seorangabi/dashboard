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
import React, { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pencil } from "lucide-react";

import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useUpdateProjectMutation from "@/common/mutations/useUpdateProjectMutation";
import type { Project } from "@/common/types/project";
import SelectTeam from "@/common/components/SelectTeam";

const formSchema = z.object({
	teamId: z.string(),
});

const UpdateProjectTeamDialog: FC<{ project: Project | undefined }> = ({
	project,
}) => {
	const [open, setOpen] = useState(false);
	const { mutateAsync, isPending } = useUpdateProjectMutation({});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			teamId: project?.teamId || "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (!project) throw new Error("Project not found");

			await mutateAsync({
				id: project?.id || "",
				...values,
			});

			toast.success("Project offered successfully");
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
						teamId: project?.teamId || "",
					});
				}

				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button variant="link" size="sm" disabled={project?.status === "DONE"}>
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<DialogHeader>
							<DialogTitle>Offer to other team</DialogTitle>
						</DialogHeader>

						<div className="space-y-3">
							<FormField
								control={form.control}
								name="teamId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Team</FormLabel>
										<FormControl>
											<SelectTeam
												value={field.value}
												onChange={field.onChange}
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
								Update
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateProjectTeamDialog;
