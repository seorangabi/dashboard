import CreateProjectBreadcrumb from "./Breadcrumb";
import { Button } from "@/common/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, InfoIcon, LoaderCircle } from "lucide-react";
import DateTimePicker24h from "@/common/components/DateTimePicker24h";

import { cn, generateErrorMessage } from "@/common/lib/utils";
import useCreateProjectMutation from "@/common/mutations/useCreateProjectMutation";
import { toast } from "sonner";
import SelectTeam from "@/common/components/SelectTeam";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/common/components/ui/popover";
import { Command, CommandList } from "cmdk";
import { CommandEmpty, CommandItem } from "@/common/components/ui/command";
import { useState } from "react";
import { useRouter } from "next/router";
import { createProjectFormSchema, type FormSchema } from "./index.schema";
import Tasks from "./Tasks";
import { milliseconds } from "date-fns";
import DurationInput from "@/common/components/DurationInput";
import { Textarea } from "@/common/components/ui/textarea";
import { PROJECT_RATIO_LABEL } from "../../constants";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/common/components/ui/alert";

// Import the MultipleUploader component
import MultipleUploader from "@/common/components/MultipleUploader";

const CreateProject = () => {
	const router = useRouter();
	const [loadingDraft, setLoadingDraft] = useState(false);
	const [loadingSubmit, setLoadingSubmit] = useState(false);

	const [openRatioDropdown, setOpenRatioDropdown] = useState(false);

	const { mutateAsync, isPending } = useCreateProjectMutation({});
	const form = useForm<FormSchema>({
		resolver: zodResolver(createProjectFormSchema),
		defaultValues: {
			autoNumberTask: true,
			deadline: new Date(),
			confirmationDuration: milliseconds({ minutes: 30 }),
			attachments: [], // Initialize with empty array
		},
	});

	const onSubmit = async (values: FormSchema) => {
		try {
			const result = await mutateAsync({
				...values,
				deadline: values.deadline.toISOString(),
			});

			toast.success("Project created successfully");

			router.push(
				`/admin/project-management/projects/${result?.data?.doc?.id}`,
			);
		} catch (error) {
			console.error(error);
			toast.error(generateErrorMessage(error));
		}
	};

	return (
		<div>
			<CreateProjectBreadcrumb />

			<div className="flex justify-between items-center mt-6 mb-5">
				<h1 className="text-2xl font-medium">Create Project</h1>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name*</FormLabel>
									<FormControl>
										<Input
											placeholder="Name"
											{...field}
											onChange={(e) => {
												const val = e.currentTarget.value;
												field.onChange(val ? val.toUpperCase() : null);
											}}
										/>
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
										<Input
											placeholder="Client name"
											{...field}
											onChange={(e) => {
												const val = e.currentTarget.value;
												field.onChange(val ? val.toUpperCase() : null);
											}}
										/>
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
											date={field.value}
											setDate={(date) => field.onChange(date)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmationDuration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmation Duration*</FormLabel>
									<FormControl>
										<DurationInput
											duration={field.value}
											onDurationChange={(date) => field.onChange(date)}
											classNames={{
												popoverContent: "w-[350px]",
											}}
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
														onChange={(e) => {
															const val = e.currentTarget.value;
															field.onChange(val ? val.toUpperCase() : null);
														}}
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
							name="teamId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team*</FormLabel>
									<FormControl>
										<SelectTeam value={field.value} onChange={field.onChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="note"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Note"
										className="resize-none min-h-24"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Add File Attachments Component */}
					<FormField
						control={form.control}
						name="attachments"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Attachments</FormLabel>
								<FormControl>
									<MultipleUploader
										value={field.value}
										onChange={field.onChange}
										onError={(error) =>
											toast.error(generateErrorMessage(error))
										}
										forFeature="project"
										maxSizeMB={5}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Alert variant="default">
						<InfoIcon className="h-4 w-4" />
						<AlertTitle>Information</AlertTitle>
						<AlertDescription>
							If there are many tasks, it is recommended to add tasks after
							saving the draft.
						</AlertDescription>
					</Alert>

					<hr />
					<Tasks form={form} />
					<hr />

					<div className="flex gap-x-2">
						<Button
							type="button"
							onClick={async () => {
								setLoadingDraft(true);
								form.setValue("isPublished", false);
								await form
									.handleSubmit(onSubmit)()
									.finally(() => {
										setLoadingDraft(false);
									});
							}}
							disabled={loadingDraft || loadingSubmit}
						>
							{loadingDraft && <LoaderCircle className="animate-spin" />}
							Create Draft
						</Button>
						<Button
							type="button"
							onClick={async () => {
								setLoadingSubmit(true);
								form.setValue("isPublished", true);
								await form
									.handleSubmit(onSubmit)()
									.finally(() => {
										setLoadingSubmit(false);
									});
							}}
							variant="outline"
							disabled={loadingSubmit || loadingDraft}
						>
							{loadingSubmit && <LoaderCircle className="animate-spin" />}
							Create
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default CreateProject;
