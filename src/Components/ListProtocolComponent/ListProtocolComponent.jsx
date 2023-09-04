import React from "react";
import { useSelector } from "react-redux";

function ListProtocolComponent({
  index,
  doc,
  setProtocolContent,
  setProtocolModal,
}) {
  const date = new Date(doc.createdAt);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {doc.sampleId ? `PTCL-${doc.protocolId}` : `PTCL-000${index + 1}`}
      </th>
      <td className="px-6 py-4">{doc.title}</td>
      <td className="px-6 py-4">
        {new Date(doc.createdAt).toLocaleString("en-GB").split(",")[0]},{" "}
        {new Date(doc.createdAt).toLocaleString().split(",")[1]}
      </td>
      <td className="px-6 py-4">{userInfo.name}</td>
      <td className="px-6 py-4">
        {new Date(doc.updatedAt).toLocaleString("en-GB").split(",")[0]},{" "}
        {new Date(doc.updatedAt).toLocaleString().split(",")[1]}
      </td>
      <td className="px-6 py-4">{userInfo.name}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="text-indigo-600"
          onClick={async (e) => {
            e.preventDefault();
            setProtocolContent(doc);
            setProtocolModal(true);
          }}
        >
          View
        </a>
      </td>
    </tr>
  );
}

export default ListProtocolComponent;
