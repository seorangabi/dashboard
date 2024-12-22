import { formatRupiah } from "@/common/lib/utils";
import useTaskListQuery from "@/common/queries/taskListQuery";
import { FC } from "react";
import DeleteTaskDialog from "./DeleteTaskDialog";
import CreateTaskDialog from "./CreateTaskDialog";
import UpdateTaskDialog from "./UpdateTaskDialog";

const Tasks: FC<{
  projectId: string;
}> = ({ projectId }) => {
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
      <div className="flex mb-4">
        <div className="text-2xl font-medium mr-2">Task List</div>
        <CreateTaskDialog projectId={projectId} />
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
              <div className="grid grid-cols-[1fr_300px]">
                <div>{task.note}</div>
                <div>
                  <img
                    className="object-contain w-full h-72"
                    src={task.attachmentUrl}
                    alt=""
                  />
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
