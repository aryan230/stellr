import React from "react";

function LogEntryMain({ d }) {
  const date = new Date(d.date);

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {d.userEmail}
      </th>
      <td className="px-6 py-4">{d.message}</td>
      <td className="px-6 py-4">{date.toLocaleString()}</td>
    </tr>
  );
}

export default LogEntryMain;
