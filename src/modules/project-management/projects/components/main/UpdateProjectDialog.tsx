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
import { Input } from "@/common/components/ui/input";
import React, { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle, Pencil } from "lucide-react";
import { Textarea } from "@/common/components/ui/textarea";
import DateTimePicker24h from "@/common/components/DateTimePicker24h";

import { cn, generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";
import useUpdateProjectMutation from "@/common/mutations/useUpdateProjectMutation";
import type { Project } from "@/common/types/project";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/common/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandItem,
	CommandList,
} from "@/common/components/ui/command";
import { PROJECT_RATIO_LABEL } from "../../constants";

const formSchema = z.object({
	name: z.string(),
	clientName: z.string(),
	deadline: z.date(),
	imageRatio: z.string(),
	note: z.string().optional(),
});

const UpdateProjectDialog: FC<{
	project: Project | undefined;
	onSuccess?: () => void;
}> = ({ project, onSuccess }) => {
	const [open, setOpen] = useState(false);
	const [openRatioDropdown, setOpenRatioDropdown] = useState(false);
	const { mutateAsync, isPending } = useUpdateProjectMutation({});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await mutateAsync({
				id: project?.id || "",
				...values,
				deadline: values.deadline.toISOString(),
			});

			toast.success("Project updated successfully");
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
						name: project?.name || "",
						clientName: project?.clientName || "",
						imageRatio: project?.imageRatio || "",
						note: project?.note || "",
						deadline: new Date(),
					});

				setOpen(newOpen);
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="default"
					size="sm"
					disabled={project?.status !== "OFFERING"}
				>
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<DialogHeader>
							<DialogTitle>Update Project</DialogTitle>
						</DialogHeader>

						<div className="space-y-3">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name*</FormLabel>
										<FormControl>
											<Input placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="clientName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Client*</FormLabel>
										<FormControl>
											<Input placeholder="Client name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="deadline"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Deadline*</FormLabel>
										<FormControl>
											<DateTimePicker24h
												date={field.value ? new Date(field.value) : undefined}
												setDate={(date) => field.onChange(date?.toISOString())}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="imageRatio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image Ratio*</FormLabel>
										<FormControl>
											<Popover
												open={openRatioDropdown}
												onOpenChange={setOpenRatioDropdown}
											>
												<PopoverTrigger asChild>
													<div>
														<Input
															placeholder="1:1"
															autoCorrect="off"
															autoFocus={false}
															autoComplete="off"
															{...field}
														/>
													</div>
												</PopoverTrigger>
												<PopoverContent
													className="w-[370px] p-0"
													onOpenAutoFocus={(e) => e.preventDefault()}
												>
													<Command>
														<CommandList>
															<CommandEmpty>No option found.</CommandEmpty>
															{PROJECT_RATIO_LABEL.map((ratio) => (
																<CommandItem
																	key={ratio}
																	onSelect={() => {
																		field.onChange(ratio);
																		setOpenRatioDropdown(false);
																	}}
																	className="justify-between"
																>
																	{ratio}
																	<Check
																		className={cn(
																			"mr-2 h-4 w-4",
																			field.value === ratio
																				? "opacity-100"
																				: "opacity-0",
																		)}
																	/>
																</CommandItem>
															))}
														</CommandList>
													</Command>
												</PopoverContent>
											</Popover>
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
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Note"
												className="resize-none"
												{...field}
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

export default UpdateProjectDialog;
