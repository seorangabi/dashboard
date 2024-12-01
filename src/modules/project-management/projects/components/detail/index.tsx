import React from "react";
import ProjectDetailBreadcrumb from "./Breadcrumb";
import DeleteProjectDialog from "../main/DeleteProjectDialog";
import UpdateProjectDialog from "../main/UpdateProjectDialog";

const ProjectDetail = () => {
  return (
    <div>
      <ProjectDetailBreadcrumb />

      <div className="flex justify-between items-center mt-6 mb-5">
        <h1 className="text-2xl font-medium">Project Detail</h1>
        <div className="space-x-2">
          <DeleteProjectDialog />
          <UpdateProjectDialog />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
