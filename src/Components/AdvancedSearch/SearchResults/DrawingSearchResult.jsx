import React from "react";

function DrawingSearchResult({ drawing, responseType }) {
  const date = new Date(drawing.createdAt);
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {drawing._id}
      </th>
      <td className="px-6 py-4">{drawing.name}</td>
      <td className="px-6 py-4">{responseType}</td>
      <td className="px-6 py-4">{date.toLocaleString()}</td>
      <td className="px-6 py-4">{drawing.updatedAt}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="text-indigo-600"
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          View
        </a>
      </td>
    </tr>
  );
}

export default DrawingSearchResult;
