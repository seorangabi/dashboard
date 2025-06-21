import apiInstance from "../lib/axios";

export type UploadBody = {
	file: File;
	forFeature: "task" | "project";
};

export type UploadResponse = {
	doc: {
		path: string;
		url: string;
	};
};

const uploadService = {
	upload: async ({ body }: { body: UploadBody }) => {
		const formData = new FormData();
		formData.append("forFeature", body.forFeature);
		formData.append("file", body.file, body.file.name);
		return apiInstance.post<UploadResponse>("/v1/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};

export default uploadService;
