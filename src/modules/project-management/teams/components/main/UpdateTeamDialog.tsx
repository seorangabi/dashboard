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
import { LoaderCircle, Pencil } from "lucide-react";
import useUpdateTeamMutation from "@/common/mutations/updateTeamMutation";
import type { Team } from "@/common/types/team";
import { toast } from "sonner";
import { generateErrorMessage } from "@/common/lib/utils";

const formSchema = z.object({
	name: z.string().min(1),
	discordUserId: z.string().min(1),
	discordChannelId: z.string().min(1),
	bankNumber: z.string().optional(),
	bankAccountHolder: z.string().optional(),
	bankProvider: z.string().optional(),
});

const UpdateTeamDialog: FC<{
	team: Team | undefined;
}> = ({ team }) => {
	const [open, setOpen] = useState(false);
	const { mutateAsync, isPending } = useUpdateTeamMutation({});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await mutateAsync({
				id: team?.id || "",
				discordUserId: values.discordUserId,
				discordChannelId: values.discordChannelId,
				name: values.name || "",
				bankNumber: values.bankNumber || null,
				bankAccountHolder: values.bankAccountHolder || null,
				bankProvider: values.bankProvider || null,
			});

			toast.success("Team updated successfully");
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
			onOpenChange={(newOpen) => {
				if (newOpen)
					form.reset({
						name: team?.name || "",
						discordUserId: team?.discordUserId || "",
						discordChannelId: team?.discordChannelId || "",
						bankNumber: team?.bankNumber || "",
						bankAccountHolder: team?.bankAccountHolder || "",
						bankProvider: team?.bankProvider || "",
					});

				setOpen(newOpen);
			}}
		>
			<DialogTrigger asChild>
				<Button variant="default" size="sm">
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<DialogHeader>
							<DialogTitle>Update Team</DialogTitle>
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
								name="discordUserId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Discord User ID*</FormLabel>
										<FormControl>
											<Input placeholder="Discord User ID" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="discordChannelId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Discord Channel ID*</FormLabel>
										<FormControl>
											<Input placeholder="Discord Channel ID" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bankAccountHolder"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank Account Holder</FormLabel>
										<FormControl>
											<Input placeholder="Bank Account Holder" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bankNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank Number</FormLabel>
										<FormControl>
											<Input placeholder="Bank Number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bankProvider"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank Provider</FormLabel>
										<FormControl>
											<Input placeholder="Bank Provider" {...field} />
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

export default UpdateTeamDialog;
