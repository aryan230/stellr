import React from "react";
import ListSampleOther from "../../Components/ListSampleComponent/ListSampleOther";
import ListSampleSubject from "../../Components/ListSampleComponent/ListSampleSubject";

function ASamples({ data }) {
  return (
    <div className="relative overflow-x-auto overflow-y-auto px-10">
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
              Created By User
            </th>
            <th scope="col" className="px-6 py-3">
              Created On
            </th>
          </tr>
        </thead>
        <tbody>
          {data.samples &&
            data.samples.map((e) => (
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {e._id}
                </th>
                <td className="px-6 py-4">{JSON.parse(e.data).sampleName}</td>
                <td className="px-6 py-4">
                  {data.users.find((b) => b._id == e.user)
                    ? data.users.find((b) => b._id == e.user).email
                    : "Deactivated User"}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="text-indigo-600"
                    onClick={async (e) => {
                      e.preventDefault();
                    }}
                  >
                    {
                      new Date(e.createdAt)
                        .toLocaleString("en-GB")
                        .split(",")[0]
                    }
                    , {new Date(e.createdAt).toLocaleString().split(",")[1]}
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ASamples;
