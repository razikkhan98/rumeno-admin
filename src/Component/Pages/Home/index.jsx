import React, { useEffect, useState } from "react";
import axios from "axios";
// Component
import Mean from "../../Common/Mean";
import Navbar from "../../Common/Navbar";
// Image
import ManLaptop from "../../assets/img/illustrations/man-with-laptop-light.png";
import ChartSucces from "../../assets/img/icons/unicons/chart-success.png";
import WalletInfo from "../../assets/img/icons/unicons/wallet-info.png";
import Paypal from "../../assets/img/icons/unicons/paypal.png";
import CcPrimary from "../../assets/img/icons/unicons/cc-primary.png";
import BarChart from "../../Common/Chart/barchart";
import PieChartNo from "../../Common/Chart/pieChart";
import Table from "../../Common/Table";
const Home = () => {
  const apiUrl = `${process.env.REACT_APP_API_DASHBOARD}`;

  const [dashData, setdashData] = useState()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/dashboard`)
      setdashData( response?.data);
      console.log('response?.data: ', response?.data);
    } catch (error) {
      console.log('error: ', error);
    }
  }


  return (
    <>
      {/* <!-- Layout wrapper --> */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          {/* <!-- Menu --> */}
          <Mean />
          {/* <!-- / Menu --> */}
          {/* <!-- Layout container --> */}
          <div className="layout-page">
            {/* <!-- Navbar --> */}
            <Navbar />

            {/* <!-- / Navbar --> */}
            {/* <!-- Content wrapper --> */}
            <div className="content-wrapper">
              {/* <!-- Content --> */}

              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">
                              Congratulations John! 🎉
                            </h5>
                            <p className="mb-4">
                              You have done <span className="fw-bold">72%</span>{" "}
                              more sales today. Check your new badge in your
                              profile.
                            </p>

                            <a
                              href="javascript:;"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View Badges
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-4">
                            <img
                              src={ManLaptop}
                              height="140"
                              alt="View Badge User"
                              data-app-dark-img="illustrations/man-with-laptop-dark.png"
                              data-app-light-img="illustrations/man-with-laptop-light.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 order-1">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src={ChartSucces}
                                  alt="chart success"
                                  className="rounded"
                                />
                              </div>

                            </div>
                            <span className="fw-semibold d-block mb-1">Profit</span>
                            <h3 className="card-title mb-2">₹ 12,628</h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt"></i> +72.80%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src={WalletInfo}
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>

                            </div>
                            <span>Sales</span>
                            <h3 className="card-title text-nowrap mb-1">{dashData?.totalsale}</h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt"></i> +28.42%
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Total Revenue --> */}
                  <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    <div className="card">
                      <div className="row row-bordered g-0">
                        <div className="col-md-6 d-grid justify-content-center text-center">
                          <h5 className="card-header m-0 me-2 pb-3">
                            Total Revenue
                          </h5>
                          <PieChartNo pieData={dashData?.piechart} />
                        </div>
                        <div className="col-md-6">
                          <div className="chart">
                            <div className="text-center fw-semibold pt-3 mb-2">
                              6 months Revenue
                            </div>

                            <div className="row justify-content-between">
                              {dashData?.sixMonth?.map((item,index)=>(
                                <>
                              <div className="d-flex justify-content-center align-items-center  my-3 col-lg-6">
                                <div className="me-2">
                                  <span className="badge bg-label-primary p-2">
                                    <i className="bx bx-dollar text-primary"></i>
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>{item?.date}</small>
                                  <h6 className="mb-0">₹ {item?.totalAmount?.toLocaleString()}</h6>
                                </div>
                              </div>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--/ Total Revenue --> */}
                  <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                    <div className="row">
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src={Paypal}
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>

                            </div>
                            <span className="d-block mb-1">Total Amount</span>
                            <h3 className="card-title text-nowrap mb-2">₹ {dashData?.totalPayment?.toLocaleString()}</h3>
                            <small className="text-danger fw-semibold">
                              <i className="bx bx-down-arrow-alt"></i> -14.82%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src={CcPrimary}
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Transactions
                            </span>
                            <h3 className="card-title mb-2">₹ {dashData?.lastTransaction?.toLocaleString()}</h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt"></i> +28.14%
                            </small>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
                <div className="col-lg-12  mb-4">
                  <div className="card">
                    <div className="card-body">
                      <BarChart barData={dashData?.bargraph} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
};

export default Home;

