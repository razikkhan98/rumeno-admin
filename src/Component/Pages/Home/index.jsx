import React from "react";

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
                            <h3 className="card-title text-nowrap mb-1">₹ 4,679</h3>
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
                        <div className="col-md-6">
                          <h5 className="card-header m-0 me-2 pb-3">
                            Total Revenue
                          </h5>
                          <PieChartNo />
                        </div>
                        <div className="col-md-6">
                          <div className="chart">
                            <div className="text-center fw-semibold pt-3 mb-2">
                              6 months Revenue
                            </div>

                            <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                              <div className="d-flex">
                                <div className="me-2">
                                  <span className="badge bg-label-primary p-2">
                                    <i className="bx bx-dollar text-primary"></i>
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>July</small>
                                  <h6 className="mb-0">₹ 32.5k</h6>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="me-2">
                                  <span className="badge bg-label-info p-2">
                                    <i className="bx bx-wallet text-info"></i>
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>August</small>
                                  <h6 className="mb-0">₹ 41.2k</h6>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                              <div className="d-flex">
                                <div className="me-2">
                                  <span className="badge bg-label-primary p-2">
                                    <i className="bx bx-dollar text-primary"></i>
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>September</small>
                                  <h6 className="mb-0">₹ 32.5k</h6>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="me-2">
                                  <span className="badge bg-label-info p-2">
                                    <i className="bx bx-wallet text-info"></i>
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>October</small>
                                  <h6 className="mb-0">₹ 41.2k</h6>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                              <div className="d-flex">
                                <div className="me-2">
                                  <span className="badge bg-label-primary p-2">
                                    <i className="bx bx-dollar text-primary"></i>
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>November</small>
                                  <h6 className="mb-0">₹ 32.5k</h6>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="me-2"> 
                                  <span className="badge bg-label-info p-2">
                                    <i className="bx bx-wallet text-info"></i>
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>December</small>
                                  <h6 className="mb-0">₹ 41.2k</h6>
                                </div>
                              </div>
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
                            <span className="d-block mb-1">Payments</span>
                            <h3 className="card-title text-nowrap mb-2">₹ 2,456</h3>
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
                            <h3 className="card-title mb-2">₹ 14,857</h3>
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
                      <BarChart />
                    </div>
                  </div>
                </div>
                <Table/>
              </div>

              {/* <!-- / Content --> */}

              {/* <!-- Footer --> */}
              {/* <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0">
                    ©<script>document.write(new Date().getFullYear());</script>,
                    made with ❤️ by
                    <a
                      href="https://themeselection.com"
                      target="_blank"
                      className="footer-link fw-bolder"
                    >
                      ThemeSelection
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://themeselection.com/license/"
                      className="footer-link me-4"
                      target="_blank"
                    >
                      License
                    </a>
                    <a
                      href="https://themeselection.com/"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      More Themes
                    </a>

                    <a
                      href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      Documentation
                    </a>

                    <a
                      href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      Support
                    </a>
                  </div>
                </div>
              </footer> */}
              {/* <!-- / Footer --> */}

              {/* <div className="content-backdrop fade"></div> */}
            </div>
            {/* <!-- Content wrapper --> */}
          </div>
          {/* <!-- / Layout page --> */}
        </div>
        {/* <!-- Overlay --> */}
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
      {/* <!-- / Layout wrapper --> */}
    </>
  );
};

export default Home;
