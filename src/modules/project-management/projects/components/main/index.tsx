import ProjectsTable from "./Table";
import ProjectSidebar from "./Sidebar";
import Link from "next/link";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";

const Projects = () => {
	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-2xl font-medium">Projects</h1>
				<Link href="/admin/project-management/projects/create">
					<Button>
						<Plus />
					</Button>
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5">
				<ProjectsTable />
				<ProjectSidebar />
			</div>
		</div>
	);
};

export default Projects;
