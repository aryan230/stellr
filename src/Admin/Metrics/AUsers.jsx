import { Alert, Chip } from "@mui/material";
import React from "react";
import InsideUsers from "./InsideAdmin/InsideUsers";

function AUsers({ data }) {
  return (
    <div className="relative overflow-x-auto overflow-y-auto px-5">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Admin
            </th>
            <th scope="col" className="px-6 py-3">
              Organization
            </th>

            <th scope="col" className="px-6 py-3">
              Last Online
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.users &&
            data.users.map((e) => <InsideUsers e={e} data={data} />)}
        </tbody>
      </table>
    </div>
  );
}

export default AUsers;
