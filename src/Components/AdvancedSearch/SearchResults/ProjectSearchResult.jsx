import React from "react";

function ProjectSearchResult({
  project,
  index,
  responseType,
  setWhichTabisActive,
  setProjectInsideActiveId,
  setProjectInsideActive,
}) {
  const date = new Date(project.createdAt);
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {project._id}
      </th>
      <td className="px-6 py-4">{project.name}</td>
      <td className="px-6 py-4">{responseType}</td>
      <td className="px-6 py-4">{date.toLocaleString()}</td>
      <td className="px-6 py-4">{project.updatedAt}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="text-indigo-600"
          onClick={async (e) => {
            e.preventDefault();
            setProjectInsideActiveId(project._id);
            setProjectInsideActive(true);
            setWhichTabisActive("projectList");
          }}
        >
          View
        </a>
      </td>
    </tr>
  );
}

export default ProjectSearchResult;
