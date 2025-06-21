import { useState } from "react";
import useProjectAttachmentsQuery from "@/common/queries/useProjectAttachmentsQuery";
import useCreateProjectAttachmentMutation from "@/common/mutations/useCreateProjectAttachmentMutation";
import useDeleteProjectAttachmentMutation from "@/common/mutations/useDeleteProjectAttachmentMutation";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent } from "@/common/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/common/components/ui/dialog";
import MultipleUploader from "@/common/components/MultipleUploader";
import { Eye, Paperclip, Trash2, Upload } from "lucide-react";
import { Skeleton } from "@/common/components/ui/skeleton";
import { generateErrorMessage } from "@/common/lib/utils";
import { toast } from "sonner";

type ProjectAttachmentsProps = {
	projectId: string;
};

const ProjectAttachments = ({ projectId }: ProjectAttachmentsProps) => {
	const [isAddAttachmentOpen, setIsAddAttachmentOpen] = useState(false);
	const [newAttachments, setNewAttachments] = useState<string[]>([]);

	// Queries & Mutations
	const { data, isLoading } = useProjectAttachmentsQuery({
		query: { projectId },
	});
	const createAttachment = useCreateProjectAttachmentMutation({});
	const deleteAttachment = useDeleteProjectAttachmentMutation({});

	// Preview attachment in modal
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	// Check if file is an image based on URL or extension
	const isImageFile = (url: string) => {
		return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
	};

	// Handle adding new attachments
	const handleAddAttachments = async () => {
		try {
			for (const url of newAttachments) {
				await createAttachment.mutateAsync({ projectId, url });
			}

			toast.success("Attachments added", {
				description: "Project attachments have been added successfully.",
			});

			setNewAttachments([]);
			setIsAddAttachmentOpen(false);
		} catch (error) {
			toast.error("Error", {
				description: generateErrorMessage(error),
			});
		}
	};

	// Handle deleting an attachment
	const handleDeleteAttachment = async (attachmentId: string) => {
		try {
			await deleteAttachment.mutateAsync({ attachmentId, projectId });
			toast.success("Attachment deleted", {
				description: "Project attachment has been removed successfully.",
			});
		} catch (error) {
			toast.error("Error", {
				description: generateErrorMessage(error),
			});
		}
	};

	const attachments = data?.docs || [];

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-medium flex items-center gap-2">
					<Paperclip className="h-5 w-5" />
					Project Attachments
				</h2>

				<Dialog
					open={isAddAttachmentOpen}
					onOpenChange={setIsAddAttachmentOpen}
				>
					<DialogTrigger asChild>
						<Button size="sm">
							<Upload className="h-4 w-4 mr-2" />
							Add Attachments
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle>Add Project Attachments</DialogTitle>
						</DialogHeader>
						<div className="space-y-4">
							<MultipleUploader
								value={newAttachments}
								onChange={setNewAttachments}
								onError={(error) =>
									toast.error("Upload Error", {
										description: generateErrorMessage(error),
									})
								}
								forFeature="project"
								maxSizeMB={5}
							/>

							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={() => setIsAddAttachmentOpen(false)}
								>
									Cancel
								</Button>
								<Button
									onClick={handleAddAttachments}
									disabled={newAttachments.length === 0}
								>
									Save Attachments
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Preview Modal */}
			<Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
				<DialogContent className="max-w-3xl max-h-screen overflow-auto">
					<DialogHeader>
						<DialogTitle>Attachment Preview</DialogTitle>
					</DialogHeader>
					<div className="flex justify-center">
						{previewUrl && isImageFile(previewUrl) ? (
							<div className="relative w-full h-[60vh]">
								<img
									src={previewUrl}
									alt="Attachment preview"
									style={{
										objectFit: "contain",
									}}
								/>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center">
								<p>This file cannot be previewed</p>
								<Button
									variant="outline"
									className="mt-4"
									onClick={() => window.open(previewUrl!, "_blank")}
								>
									Open in New Tab
								</Button>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} className="h-32 w-full" />
					))}
				</div>
			) : attachments.length === 0 ? (
				<div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
					<Paperclip className="h-10 w-10 mb-2" />
					<p>No attachments yet</p>
					<Button variant="link" onClick={() => setIsAddAttachmentOpen(true)}>
						Add your first attachment
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{attachments.map((attachment) => (
						<Card key={attachment.id} className="overflow-hidden">
							<CardContent className="p-0 relative group">
								{isImageFile(attachment.url) ? (
									<div className="relative h-40 w-full bg-muted flex items-center justify-center">
										<img
											src={attachment.url}
											alt="Project attachment"
											style={{ objectFit: "cover" }}
										/>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
											<Button
												variant="secondary"
												size="icon"
												className="mr-2"
												onClick={() => setPreviewUrl(attachment.url)}
											>
												<Eye className="h-4 w-4" />
											</Button>
											<Button
												variant="destructive"
												size="icon"
												onClick={() => handleDeleteAttachment(attachment.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								) : (
									<div className="h-40 flex items-center justify-center bg-muted">
										<div className="text-center p-4">
											<Paperclip className="h-8 w-8 mx-auto mb-2" />
											<p className="text-sm truncate max-w-full">
												{attachment.url.split("/").pop()}
											</p>
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
												<Button
													variant="secondary"
													size="icon"
													className="mr-2"
													onClick={() => window.open(attachment.url, "_blank")}
												>
													<Eye className="h-4 w-4" />
												</Button>
												<Button
													variant="destructive"
													size="icon"
													onClick={() => handleDeleteAttachment(attachment.id)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default ProjectAttachments;
