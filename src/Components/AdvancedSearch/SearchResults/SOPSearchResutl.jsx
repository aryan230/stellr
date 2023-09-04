import React from "react";

function SOPSearchResult({
  sop,
  index,
  responseType,
  setSopContent,
  setSopModal,
}) {
  const date = new Date(sop.createdAt);
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {sop._id}
      </th>
      <td className="px-6 py-4">{sop.title}</td>
      <td className="px-6 py-4">{responseType}</td>
      <td className="px-6 py-4">{date.toLocaleString()}</td>
      <td className="px-6 py-4">{sop.updatedAt}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="text-indigo-600"
          onClick={async (e) => {
            e.preventDefault();
            setSopContent(sop);
            setSopModal(true);
          }}
        >
          View
        </a>
      </td>
    </tr>
  );
}

export default SOPSearchResult;
