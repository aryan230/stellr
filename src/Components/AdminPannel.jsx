import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAdminMetrics } from "../redux/actions/userActions";
import AdminUsers from "../Admin/AdminUsers";
import _ from "lodash";

function AdminPannel() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [adminUsers, setAdminUsers] = useState(false);
  const [adminType, setAdminType] = useState();
  const userAdminMetrics = useSelector((state) => state.userAdminMetrics);
  const { metrics, sucess, loading, error } = userAdminMetrics;

  useEffect(() => {
    dispatch(getUserAdminMetrics());
  }, [dispatch]);
  console.log(Object.entries(metrics));

  return (
    <div className="admin-pannel">
      {adminUsers && (
        <AdminUsers
          data={metrics ? metrics : []}
          setAdminUsers={setAdminUsers}
          adminType={adminType}
        />
      )}
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-10">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"></div>
        {metrics && (
          <div className="bg-gray-50 pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Stellr Admin
                </h2>
              </div>
            </div>
            <div className="mt-10 pb-12 bg-white sm:pb-16">
              <div className="relative">
                <div className="absolute inset-0 h-1/2 bg-gray-50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                      <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                          Users
                        </dt>
                        <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                          {metrics.users && metrics.users.length}
                        </dd>
                      </div>
                      <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                          Projects
                        </dt>
                        <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                          {metrics.projects && metrics.projects.length}
                        </dd>
                      </div>
                      <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                          Organizations
                        </dt>
                        <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                          {metrics.organizations &&
                            metrics.organizations.length}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {metrics && (
          <div className="relative overflow-x-auto overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-md text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Entity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Numbers
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View All
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(metrics).map((e) => (
                  <tr className="bg-white border-b text-md">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-md"
                    >
                      {_.startCase(e[0])}
                    </th>
                    <td className="px-6 py-4 text-md">{e[1].length}</td>

                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="text-indigo-600 text-md"
                        onClick={async (d) => {
                          d.preventDefault();
                          setAdminType(_.startCase(e[0]));
                          setAdminUsers(true);
                        }}
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPannel;
