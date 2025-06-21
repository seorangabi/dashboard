import { useCallback, useState, type FC } from "react";
import { Button } from "./ui/button";
import useUploadMutation from "../mutations/useUploadMutation";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import imageCompression, { type Options } from "browser-image-compression";

const MultipleImageUploader: FC<{
	value: string[];
	onChange: (value: string[]) => void;
	onError: (error: unknown) => void;
	compressionOptions?: Options;
	forFeature?: "task" | "project"; // Added forFeature prop
}> = ({
	value,
	onChange,
	onError,
	compressionOptions,
	forFeature = "task",
}) => {
	// Added default value
	const { mutateAsync } = useUploadMutation({});
	const [loading, setLoading] = useState(false);

	const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
		async (acceptedFiles) => {
			setLoading(true);
			try {
				const temp: string[] = [];

				for (const file of acceptedFiles) {
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
						forFeature: forFeature, // Now using the prop value instead of hardcoded "task"
					});

					temp.push(response.doc.url);
				}

				onChange([...value, ...temp]);
			} catch (error) {
				onError(error);
			} finally {
				setLoading(false);
			}
		},
		[value, forFeature], // Added forFeature to dependency array
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/png": [],
			"image/jpg": [],
			"image/jpeg": [],
			"image/webp": [],
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

				<div className="relative">
					<div
						{...getRootProps()}
						className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-8"
					>
						<Input {...getInputProps()} type="file" />

						{isDragActive ? <p>Drop the image!</p> : <p>Add Image</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MultipleImageUploader;
