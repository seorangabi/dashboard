import { z } from "zod";

export const createProjectFormSchema = z.object({
	name: z.string(),
	deadline: z.date(),
	imageRatio: z.string(),
	teamId: z.string(),
	clientName: z.string(),
	tasks: z.array(
		z.object({
			fee: z.number(),
			imageCount: z.number(),
			note: z.string(),
			attachments: z.array(z.string()),
		}),
	),
	confirmationDuration: z.number(),
	note: z.string(),
	autoNumberTask: z.boolean(),
	isPublished: z.boolean().optional().default(true),
	attachments: z.array(z.string()).default([]), // Changed from File[] to string[]
});

export type FormSchema = z.infer<typeof createProjectFormSchema>;
