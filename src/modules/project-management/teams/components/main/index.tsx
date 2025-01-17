import React from "react";
import AddTeamDialog from "./AddTeamDialog";
import TeamsTable from "./Table";

const Teams = () => {
	return (
		<div className="max-w-3xl">
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-2xl font-medium">Teams</h1>
				<AddTeamDialog />
			</div>
			<TeamsTable />
		</div>
	);
};

export default Teams;
