import React, { type FC, useCallback, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import imageCompression, { type Options } from "browser-image-compression";
import useUploadMutation from "../mutations/useUploadMutation";
import { LoaderCircle } from "lucide-react";

const ImageUploader: FC<{
	value: string;
	onChange: (props: { file: File; path: string; url: string }) => void;
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

				onChange({
					file: compressedFile,
					path: response.doc.path,
					url: response.doc.url,
				});
			} catch (error) {
				onError(error);
			} finally {
				setLoading(false);
			}
		},
		[],
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
			<div
				{...getRootProps()}
				className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-8"
			>
				{value && (
					<img
						src={value}
						alt="Uploaded"
						className="max-h-[400px] rounded-lg"
					/>
				)}
				<Input {...getInputProps()} type="file" />
				{isDragActive ? (
					<p>Drop the image!</p>
				) : (
					<p>Click here or drag an image to upload it</p>
				)}
			</div>
		</div>
	);
};

export default ImageUploader;
