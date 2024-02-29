import React from "react";
import Avatars1 from "../../assets/img/avatars/1.png";
import Avatars2 from "../../assets/img/avatars/5.png";
import Avatars3 from "../../assets/img/avatars/6.png";
import Avatars4 from "../../assets/img/avatars/7.png";

const Table = () => {
  let json_admin_data = [
    {
      id: "1",
      clientID: "723401",
      clientName: "Razik Khan",
      totalOrders: "21",
      ordersValue: "18000",
      lastDate: "24-12-2023",
    },
    {
      id: "2",
      clientID: "723402",
      clientName: "Noor Mohammad",
      totalOrders: "18",
      ordersValue: "27000",
      lastDate: "17-12-2023",
    },
    {
      id: "3",
      clientID: "723403",
      clientName: "Shoeb Khan",
      totalOrders: "2",
      ordersValue: "3000",
      lastDate: "19-11-2023",
    },
    {
      id: "4",
      clientID: "723404",
      clientName: "Zoeb Khan",
      totalOrders: "11",
      ordersValue: "16000",
      lastDate: "24-12-2023",
    },
    {
      id: "5",
      clientID: "723405",
      clientName: "Rizwan Khan",
      totalOrders: "59",
      ordersValue: "48000",
      lastDate: "2-10-2023",
    },
  ]
    // [{ totalOrders: "111", totalRevenue: "112000", percentageGrowth: "57%" }];
  return (
    <>
      {/* <!-- Client Table rows --> */}
      <div className="card">
        <h5 className="card-header">Client List</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Client-Id</th>
                <th>Client-Name</th>
                <th>Total-Orders</th>
                <th>Orders-Value</th>
                <th>Last Date</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
                {json_admin_data.map((admin_data,index) =>
                    <tr>
                <td>
                  <i className="fab fa-angular fa-lg text-danger me-3"></i>
                  <strong>{admin_data.clientID}</strong>
                </td>
                <td>{admin_data.clientName}</td>
                <td>{admin_data.totalOrders}</td>
                <td>{admin_data.ordersValue}</td>
                <td>{admin_data.lastDate}</td>
                
                {/* <td>
                  <span className="badge bg-label-primary me-1">Active</span>
                </td> */}
              </tr>
                )}
              {/* <tr>
                <td>
                  <i className="fab fa-angular fa-lg text-danger me-3"></i>
                  <strong>Angular Project</strong>
                </td>
                <td>Albert Cook</td>
                <td>
                  <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    <li
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      className="avatar avatar-xs pull-up"
                      title="Lilian Fuller"
                    >
                      <img
                        src="../assets/img/avatars/5.png"
                        alt="Avatar"
                        className="rounded-circle"
                      />
                    </li>
                    <li
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      className="avatar avatar-xs pull-up"
                      title="Sophia Wilkerson"
                    >
                      <img
                        src="../assets/img/avatars/6.png"
                        alt="Avatar"
                        className="rounded-circle"
                      />
                    </li>
                    <li
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      className="avatar avatar-xs pull-up"
                      title="Christina Parker"
                    >
                      <img
                        src="../assets/img/avatars/7.png"
                        alt="Avatar"
                        className="rounded-circle"
                      />
                    </li>
                  </ul>
                </td>
                <td>
                  <span className="badge bg-label-primary me-1">Active</span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      {/* <!--/ Hoverable Table rows --> */}
    </>
  );
};
export default Table;
