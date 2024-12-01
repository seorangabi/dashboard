import React from "react";
import DeleteTeamDialog from "../main/DeleteTeamDialog";
import TeamDetailBreadcrumb from "./Breadcrumb";
import { Dot, Mail, Phone } from "lucide-react";
import UpdateTeamDialog from "../main/UpdateTeamDialog";

const TeamDetail = () => {
  return (
    <div>
      <TeamDetailBreadcrumb />

      <div className="flex justify-between items-center mt-6 mb-5">
        <h1 className="text-2xl font-medium">Team Detail</h1>
        <div className="space-x-2">
          <DeleteTeamDialog />
          <UpdateTeamDialog />
        </div>
      </div>

      <div className="border rounded-md p-4">
        <div className="flex justify-between">
          <div className="flex">
            <img
              src="https://avatar.iran.liara.run/public/41"
              alt=""
              className="size-16 rounded-full"
            />
            <div className="ml-4 mt-2">
              <h1 className="text-lg font-medium">Leanne Graham</h1>
              <div className="space-x-2">
                <span className="text-sm text-muted-foreground">
                  <Mail size={15} className="inline mr-2" />
                  t5C5o@example.com
                </span>
                <Dot className="inline text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  <Phone size={15} className="inline mr-2" />
                  1-770-736-8031 x564
                </span>
              </div>
            </div>
          </div>

          <div>{/* Actions */}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
