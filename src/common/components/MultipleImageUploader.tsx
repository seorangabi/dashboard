import { useCallback, useState, type FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import useUploadMutation from "../mutations/useUploadMutation";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import imageCompression, { type Options } from "browser-image-compression";

const MultipleImageUploader: FC<{
	value: string[];
	onChange: (value: string[]) => void;
	onError: (error: unknown) => void;
	compressionOptions?: Options;
}> = ({ value, onChange, onError, compressionOptions }) => {
	const { mutateAsync } = useUploadMutation({});
	const [loading, setLoading] = useState(false);

	const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
		async (acceptedFiles) => {
			setLoading(true);
			try {
				const file = acceptedFiles[0];
				if (!file || !(file instanceof File)) {
					throw new Error("File is not valid");
				}

				const compressedFile = await imageCompression(file, {
					maxSizeMB: 2,
					useWebWorker: true,
					preserveExif: false,
					...compressionOptions,
				});

				const response = await mutateAsync({
					file: compressedFile,
					forFeature: "task",
				});

				onChange([...value, response.doc.url]);
			} catch (error) {
				onError(error);
			} finally {
				setLoading(false);
			}
		},
		[value],
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: {
			"image/png": [],
			"image/jpg": [],
			"image/jpeg": [],
		},
		disabled: loading,
	});

	return (
		<div className="relative">
			{loading && (
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-white/50 flex flex-col justify-center items-center z-10">
					<LoaderCircle className="animate-spin" /> Loading
				</div>
			)}

			<div className="space-y-2">
				<div
					className="grid gap-1"
					style={{
						gridTemplateColumns: value?.length > 1 ? "1fr 1fr" : "1fr",
					}}
				>
					{value.map((val, index) => {
						return (
							<div key={val} className="relative group">
								<img src={val} alt="Uploaded" className="w-full" />

								<div className="hidden group-hover:flex justify-center items-center absolute inset-0 top-0 bottom-0 left-0 right-0 z-10 bg-white/50">
									<div className="space-x-1">
										<Button
											type="button"
											onClick={() => {
												window.open(val, "_blank");
											}}
										>
											<Eye />
										</Button>
										<Button
											type="button"
											onClick={() => {
												const newValue = [...value];
												newValue.splice(index, 1);
												onChange(newValue);
											}}
										>
											<Trash />
										</Button>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div
					{...getRootProps()}
					className={cn(
						buttonVariants({ variant: "outline", className: "w-full" }),
					)}
				>
					<Input {...getInputProps()} type="file" />
					Add Image
				</div>
			</div>
		</div>
	);
};

export default MultipleImageUploader;
