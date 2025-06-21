import { useCallback, useState, type FC } from "react";
import { Button } from "./ui/button";
import useUploadMutation from "../mutations/useUploadMutation";
import { Eye, FileIcon, LoaderCircle, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import imageCompression, { type Options } from "browser-image-compression";

interface FileData {
	url: string;
	isImage: boolean;
	name: string;
}

const MultipleUploader: FC<{
	value: string[];
	onChange: (value: string[]) => void;
	onError: (error: unknown) => void;
	forFeature: "task" | "project";
	compressionOptions?: Options;
	maxSizeMB?: number;
	accept?: Record<string, string[]>;
}> = ({
	value,
	onChange,
	onError,
	forFeature,
	compressionOptions,
	maxSizeMB = 10,
	accept,
}) => {
	const { mutateAsync } = useUploadMutation({});
	const [loading, setLoading] = useState(false);
	const [files, setFiles] = useState<FileData[]>([]);

	// Helper to check if a file is an image
	const isImageFile = (file: File) => {
		return file.type.startsWith("image/");
	};

	// Process initial values to determine file types
	useCallback(() => {
		const processInitialFiles = async () => {
			try {
				const processedFiles = value.map((url) => {
					// Determine if it's an image by checking extension
					const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
					const name = url.split("/").pop() || "file";

					return {
						url,
						isImage,
						name,
					};
				});

				setFiles(processedFiles);
			} catch (error) {
				onError(error);
			}
		};

		if (value.length > 0 && files.length === 0) {
			processInitialFiles();
		}
	}, [value, files.length]);

	const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
		async (acceptedFiles) => {
			setLoading(true);
			try {
				const temp: string[] = [];
				const newFiles: FileData[] = [];

				for (const file of acceptedFiles) {
					if (!file || !(file instanceof File)) {
						throw new Error("File is not valid");
					}

					if (file.size > maxSizeMB * 1024 * 1024) {
						throw new Error(`File size exceeds ${maxSizeMB}MB limit`);
					}

					let fileToUpload: File = file;

					// Compress only if it's an image
					if (isImageFile(file)) {
						fileToUpload = await imageCompression(file, {
							maxSizeMB: Math.min(2, maxSizeMB),
							useWebWorker: true,
							preserveExif: false,
							...compressionOptions,
						});
					}

					const response = await mutateAsync({
						file: fileToUpload,
						forFeature,
					});

					temp.push(response.doc.url);
					newFiles.push({
						url: response.doc.url,
						isImage: isImageFile(file),
						name: file.name,
					});
				}

				onChange([...value, ...temp]);
				setFiles([...files, ...newFiles]);
			} catch (error) {
				onError(error);
			} finally {
				setLoading(false);
			}
		},
		[value, files],
	);

	const defaultAccept = {
		"image/*": [],
		"application/pdf": [],
		"application/msword": [],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			[],
		"text/plain": [],
		"application/zip": [],
		"application/x-zip-compressed": [],
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: accept || defaultAccept,
		disabled: loading,
	});

	return (
		<div className="relative">
			{loading && (
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-white/50 flex flex-col justify-center items-center z-10">
					<LoaderCircle className="animate-spin" /> Uploading...
				</div>
			)}

			<div className="space-y-2">
				{files.length > 0 && (
					<div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{files.map((file, index) => (
							<div
								key={file.url}
								className="relative group border rounded-md overflow-hidden"
							>
								<div className="p-2 flex flex-col items-center">
									{file.isImage ? (
										<img
											src={file.url}
											alt={file.name}
											className="h-24 object-contain mb-2"
										/>
									) : (
										<div className="h-24 w-full flex items-center justify-center mb-2">
											<FileIcon size={48} />
										</div>
									)}
									<div
										className="text-xs text-center truncate w-full"
										title={file.name}
									>
										{file.name}
									</div>
								</div>

								<div className="hidden group-hover:flex justify-center items-center absolute inset-0 bg-black/50">
									<div className="space-x-1">
										<Button
											type="button"
											size="sm"
											variant="secondary"
											onClick={() => window.open(file.url, "_blank")}
										>
											<Eye size={16} />
										</Button>
										<Button
											type="button"
											size="sm"
											variant="destructive"
											onClick={() => {
												const newValue = [...value];
												newValue.splice(index, 1);

												const newFiles = [...files];
												newFiles.splice(index, 1);

												onChange(newValue);
												setFiles(newFiles);
											}}
										>
											<Trash size={16} />
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<div className="relative">
					<div
						{...getRootProps()}
						className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-8"
					>
						<Input {...getInputProps()} type="file" multiple />

						{isDragActive ? (
							<p>Drop files here!</p>
						) : (
							<p>Drag and drop files here, or click to select files</p>
						)}
						<p className="text-xs text-gray-500">
							Max file size: {maxSizeMB}MB
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MultipleUploader;
