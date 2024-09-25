import React from "react";
// Image
import Logo from '../../assets/img/favicon/favicon.ico'
import { NavLink } from "react-router-dom";

const Mean = () => {
  return (
    <>
      <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
        <div className="app-brand demo">
          {/* <a href="index.html" className="app-brand-link"> */}
            <img src={Logo} alt="Loading" />
            <span className="app-brand-text demo menu-text fw-bolder ms-2">Rumeno Admin</span>
          {/* </a> */}

          <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          {/* <!-- Dashboard --> */}
          <li className="menu-item">
            <NavLink to="/home" className="menu-link">
              <i className="menu-icon tf-icons fw-bold bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </NavLink>
          </li>
          <li className="menu-item ">
            <NavLink to="/uploadproduct" className="menu-link ">
              <i className="menu-icon tf-icons bx bxl-product-hunt"></i>
              <div data-i18n="Analytics">Upload Product</div>
            </NavLink>
          </li>
          {/* <li className="menu-item ">
              <NavLink to="/clientorder" className="menu-link ">
                <i className="menu-icon tf-icons bx bxl-product-hunt"></i>
                <div data-i18n="Analytics">Client Order</div>
              </NavLink>
            </li> */}
          <li className="menu-item ">
            <NavLink to="/upload-blog" className="menu-link ">
              <i className="menu-icon tf-icons bx bxl-blogger"></i>
              <div data-i18n="Analytics">Upload Blog</div>
            </NavLink>
          </li>
          <li className="menu-item ">
            <NavLink to="/transaction-details" className="menu-link ">
              <i class='menu-icon tf-icons fw-bold bx bx-rupee'></i>
              <div data-i18n="Analytics">Transaction Details</div>
            </NavLink>
          </li>


        </ul>
      </aside>
    </>
  )
}

export default Mean;