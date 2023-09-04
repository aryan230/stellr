import React from "react";

function SampleSearchResult({
  sample,
  index,
  responseType,
  setSampleContent,
  setSampleModal,
}) {
  const date = new Date(sample.createdAt);
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {sample._id}
      </th>
      <td className="px-6 py-4">{JSON.parse(sample.data).sampleName}</td>
      <td className="px-6 py-4">{responseType}</td>
      <td className="px-6 py-4">{date.toLocaleString()}</td>
      <td className="px-6 py-4">{sample.updatedAt}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="text-indigo-600"
          onClick={async (e) => {
            e.preventDefault();
            setSampleContent(sample);
            setSampleModal(true);
          }}
        >
          View
        </a>
      </td>
    </tr>
  );
}

export default SampleSearchResult;
