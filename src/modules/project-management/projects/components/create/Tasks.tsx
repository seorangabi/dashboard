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

const Tasks: FC<{
	form: UseFormReturn<FormSchema>;
}> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "tasks",
	});

	return (
		<div>
			<div className="flex items-center mb-2">
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
		<div className="border p-4 rounded-lg grid gap-x-6 grid-cols-[1fr_1fr] relative">
			<div className="flex gap-x-2">
				<div className="w-10 rounded">{index + 1}</div>

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
				{/* <FormField
					control={form.control}
					name={`tasks.${index}.attachmentUrl`}
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Picture</FormLabel>
							<FormControl>
								<ImageUploader
									value={value}
									onChange={({ url }) => {
										onChange(url);
										form.clearErrors(`tasks.${index}.attachmentUrl`);
									}}
									onError={(error) => {
										form.setError(`tasks.${index}.attachmentUrl`, {
											type: "manual",
											message: generateErrorMessage(error),
										});
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}
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
