import React from "react";

function ProtocolSearchResult({
  protocol,
  index,
  responseType,
  setProtocolContent,
  setProtocolModal,
}) {
  const date = new Date(protocol.createdAt);
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {protocol._id}
      </th>
      <td className="px-6 py-4">{protocol.title}</td>
      <td className="px-6 py-4">{responseType}</td>
      <td className="px-6 py-4">{date.toLocaleString()}</td>
      <td className="px-6 py-4">{protocol.updatedAt}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="text-indigo-600"
          onClick={async (e) => {
            e.preventDefault();
            setProtocolContent(protocol);
            setProtocolModal(true);
          }}
        >
          View
        </a>
      </td>
    </tr>
  );
}

export default ProtocolSearchResult;
