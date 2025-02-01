export type Task = {
	id: string;
	projectId: string;
	fee: number;
	imageCount: number;
	note: string;
	createdAt: string;
	attachmentUrl: string;

	// TODO: split type
	attachments: {
		id: string;
		taskId: string;
		url: string;
	}[];
};
