import React from "react";
import AddProjectDialog from "./AddProjectDialog";
import ProjectsTable from "./Table";
import ProjectSidebar from "./Sidebar";

const Projects = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium">Projects</h1>
        <AddProjectDialog />
      </div>
      <div className="grid grid-cols-[1fr_300px] gap-x-5">
        <ProjectsTable />
        <ProjectSidebar />
      </div>
    </div>
  );
};

export default Projects;
