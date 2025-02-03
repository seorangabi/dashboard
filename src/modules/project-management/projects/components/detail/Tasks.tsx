import { formatRupiah } from "@/common/lib/utils";
import useTaskListQuery from "@/common/queries/useTaskListQuery";
import type { FC } from "react";
import DeleteTaskDialog from "./DeleteTaskDialog";
import CreateTaskDialog from "./CreateTaskDialog";
import UpdateTaskDialog from "./UpdateTaskDialog";
import { Button } from "@/common/components/ui/button";
import { Eye } from "lucide-react";
import type { Project } from "@/common/types/project";

const Tasks: FC<{
	projectId: string;
	project: Project | undefined;
}> = ({ projectId, project }) => {
	const { data } = useTaskListQuery({
		query: {
			project_id_eq: projectId,
			sort: ["created_at:asc"],
		},
		options: {
			enabled: !!projectId,
		},
	});
	const docs = data?.data?.docs ?? [];
	return (
		<div className="mt-4">
			<div className="flex mb-4 justify-between items-center">
				<div className="flex items-center">
					<div className="text-2xl font-medium mr-2">Task List</div>
					<CreateTaskDialog projectId={projectId} />
				</div>
				<div>Auto number: {project?.autoNumberTask ? "On" : "Off"}</div>
			</div>
			<div className="space-y-2">
				{docs.map((task) => {
					return (
						<div key={task.id} className="border rounded px-3 py-4 relative">
							<div className="absolute top-2 right-2 space-x-2">
								<DeleteTaskDialog task={task} />
								<UpdateTaskDialog task={task} />
							</div>
							<div className="mb-2">Fee: {formatRupiah(task.fee)}</div>
							<div className="grid grid-cols-[1fr_1fr]">
								<div>{task.note}</div>
								<div
									className="grid gap-1"
									style={{
										gridTemplateColumns:
											task?.attachments?.length > 1 ? "1fr 1fr" : "1fr",
									}}
								>
									{task?.attachments.map((val) => {
										return (
											<div key={val.url} className="relative group">
												<img
													src={val.url}
													alt="Attachment"
													className="w-full"
												/>

												<div className="hidden group-hover:flex justify-center items-center absolute inset-0 top-0 bottom-0 left-0 right-0 z-10 bg-white/50">
													<div className="space-x-1">
														<Button
															type="button"
															onClick={() => {
																window.open(val.url, "_blank");
															}}
														>
															<Eye />
														</Button>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Tasks;
