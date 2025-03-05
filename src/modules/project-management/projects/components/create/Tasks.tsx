import { Button } from "@/common/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/common/components/ui/form";
import {
	useFieldArray,
	type UseFieldArrayRemove,
	type UseFormReturn,
} from "react-hook-form";
import { Plus, Trash } from "lucide-react";

import type { FC } from "react";
import { Textarea } from "@/common/components/ui/textarea";
import CurrencyInput from "@/common/components/CurrencyInput";
import type { FormSchema } from "./index.schema";
import { generateErrorMessage } from "@/common/lib/utils";
import MultipleImageUploader from "@/common/components/MultipleImageUploader";
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";

const Tasks: FC<{
	form: UseFormReturn<FormSchema>;
}> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "tasks",
	});

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center">
					<div className="text-lg">Tasks</div>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() =>
							append({ fee: 0, note: "", imageCount: 1, attachments: [] })
						}
					>
						<Plus />
					</Button>
				</div>

				<FormField
					control={form.control}
					name="autoNumberTask"
					render={({ field }) => (
						<FormItem className="flex items-center space-x-2">
							<FormControl>
								<Switch
									id="auto-number"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<Label htmlFor="auto-number">Auto Number</Label>
						</FormItem>
					)}
				/>
			</div>
			<div className="space-y-2">
				{fields.map((field, index) => (
					<Task index={index} form={form} key={field.id} remove={remove} />
				))}
			</div>
		</div>
	);
};

const Task: FC<{
	index: number;
	form: UseFormReturn<FormSchema>;
	remove: UseFieldArrayRemove;
}> = ({ index, form, remove }) => {
	return (
		<div className="border p-4 rounded-lg grid gap-x-6 grid-cols-1 md:grid-cols-[1fr_1fr] relative">
			<div className="flex flex-col md:flex-row gap-x-2">
				<div className="w-10 rounded mb-4">{index + 1}</div>

				<div className="w-full space-y-4">
					<FormField
						control={form.control}
						name={`tasks.${index}.fee`}
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
						name={`tasks.${index}.note`}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Note</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Note"
										className="resize-none min-h-64"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<div>
				<FormField
					control={form.control}
					name={`tasks.${index}.attachments`}
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Picture</FormLabel>
							<FormControl>
								<MultipleImageUploader
									value={value}
									onChange={(value) => {
										onChange(value);
										form.clearErrors(`tasks.${index}.attachments`);
									}}
									onError={(error) => {
										form.setError(`tasks.${index}.attachments`, {
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

			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="absolute right-0"
				onClick={() => {
					remove(index);
				}}
			>
				<Trash />
			</Button>
		</div>
	);
};

export default Tasks;
