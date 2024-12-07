import React from "react";
import ProjectDetailBreadcrumb from "./Breadcrumb";
import DeleteProjectDialog from "../main/DeleteProjectDialog";
import UpdateProjectDialog from "../main/UpdateProjectDialog";
import { useRouter } from "next/router";
import useProjectListQuery from "@/common/queries/projectListQuery";
import { format } from "date-fns";
import { PROJECT_STATUS_LABEL } from "@/modules/project-management/payroll/constants";
import UpdateProjectStatusDialog from "./UpdateProjectStatusDialog";
import { formatRupiah } from "@/common/lib/utils";
import OfferingsTable from "./OfferingTable";

const ProjectDetail = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data: ProjectListData } = useProjectListQuery({
    query: {
      id_eq: projectId,
      with: ["team"],
    },
    options: {
      enabled: !!projectId,
    },
  });
  const project = ProjectListData?.data?.docs?.[0];

  return (
    <div>
      <ProjectDetailBreadcrumb project={project} />

      <div className="flex justify-between items-center mt-6 mb-5">
        <h1 className="text-2xl font-medium">Project Detail</h1>
        <div className="space-x-2">
          <DeleteProjectDialog
            project={project}
            onSuccess={() => {
              router.push("/admin/project-management/projects");
            }}
          />
          <UpdateProjectDialog
            project={project}
            onSuccess={() => {
              router.push("/admin/project-management/projects");
            }}
          />
        </div>
      </div>

      <div className="border rounded-md p-4 mb-4">
        <div className="gap-x-6 gap-y-5 flex flex-wrap items-center [&>*]:border-r">
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Project Name</div>
            <h1 className="text-lg font-medium">{project?.name}</h1>
          </div>
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Team</div>
            <h1 className="text-lg font-medium">
              {project?.team?.name || "N/A"}
            </h1>
          </div>
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Status</div>
            <h1 className="text-lg font-medium">
              {project?.status ? PROJECT_STATUS_LABEL[project?.status] : "N/A"}
              <UpdateProjectStatusDialog project={project} />
            </h1>
          </div>
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Fee</div>
            <h1 className="text-lg font-medium">
              {project?.fee ? formatRupiah(project?.fee) : "N/A"}
            </h1>
          </div>
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Deadline</div>
            <h1 className="text-lg font-medium">
              {project?.deadline
                ? format(new Date(project.deadline), "d MMM yyyy HH:mm")
                : "N/A"}
            </h1>
          </div>
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Client Name</div>
            <h1 className="text-lg font-medium">
              {project?.clientName || "N/A"}
            </h1>
          </div>
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Image Ratio</div>
            <h1 className="text-lg font-medium">
              {project?.imageRatio || "N/A"}
            </h1>
          </div>
          <div className="px-6">
            <div className="text-muted-foreground text-xs">Image Count</div>
            <h1 className="text-lg font-medium">
              {project?.imageCount || "N/A"}
            </h1>
          </div>

          <div className="px-6">
            <div className="text-muted-foreground text-xs">Note</div>
            <h1 className="text-lg font-medium">{project?.note || "N/A"}</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xl mb-2 font-medium">Offering List</div>
        <OfferingsTable />
      </div>
    </div>
  );
};

export default ProjectDetail;
