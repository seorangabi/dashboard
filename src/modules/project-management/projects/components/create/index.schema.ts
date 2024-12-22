import { z } from "zod";

export const formSchema = z.object({
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
      attachmentUrl: z.string(),
    })
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
