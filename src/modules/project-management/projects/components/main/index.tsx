import React from "react";
import AddProjectDialog from "./AddProjectDialog";
import ProjectsTable from "./Table";

const Projects = () => {
  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium">Projects</h1>
        <AddProjectDialog />
      </div>
      <ProjectsTable />
    </div>
  );
};

export default Projects;
