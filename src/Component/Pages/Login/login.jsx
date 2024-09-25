
import React, { useContext, useEffect } from "react";
import '../Login/login.css'
import login_img from "../../assets/img/Logo/signup-image.jpg"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Common/UseContext/useContext";

const Login = () => {

    const { setUserLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    

    const onSubmit = async (data) => {
        console.log('data: ', data);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_DETAILS}/login`, data)
            console.log('response?.data?.role: ', response?.data?.role);
            if(response?.data?.role) {
                localStorage.setItem('loginDetails', JSON.stringify(response?.data));
                setUserLogin(response?.data?.name);
                // console.log('response?.data?.name: ', response?.data?.name);
                navigate('/home')
            }
        } catch (error) {
            console.log('error: ', error);

        }
    };


    return (
        // <section className="sign-in">
        //     <div className="container">
        //         <div className="signin-content">
        //             <div className="signin-image">
        //                 <figure>
        //                     <img className="login-image" src={login_img} alt="sign in" />
        //                 </figure>
        //             </div>
        //             <div className="signin-form">
        //                 <h2 className="form-title">Sign in</h2>
        //                 <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        //                     <div className="form-group">
        //                         <label htmlFor="login-label">
        //                             <i className="zmdi zmdi-account material-icons-name"></i>
        //                         </label>
        //                         <input
        //                             type="number"
        //                             name="mobile"
        //                             id="mobile"
        //                             placeholder="Mobile Number"
        //                             {...register("mobile", { required: "Number is required" })}
        //                         />
        //                         {errors.mobile && (
        //                             <p className="error-message">{errors.mobile.message}</p>
        //                         )}
        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="login-label">
        //                             <i className="zmdi zmdi-lock"></i>
        //                         </label>
        //                         <input
        //                             type="password"
        //                             name="password"
        //                             id="password"
        //                             placeholder="Password"
        //                             {...register("password", { required: "Password is required" })}
        //                         />
        //                         {errors.password && (
        //                             <p className="error-message">{errors.password.message}</p>
        //                         )}
        //                     </div>
        //                     <div className="form-group form-button">
        //                         <input
        //                             type="submit"
        //                             name="signin"
        //                             className="form-submit"
        //                             value="Log in"
        //                         />
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <section className="login-sign-in">
  <div className="login-container">
    <div className="login-signin-content">
      <div className="login-signin-image">
        <figure className="login-figure">
          <img className="login-image" src={login_img} alt="sign in" />
        </figure>
      </div>
      <div className="login-signin-form">
        <h2 className="login-form-title">Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-register-form">
          <div className="login-form-group">
            <label htmlFor="mobile-label">
              <i className="zmdi zmdi-account material-icons-name"></i>
            </label>
            <input
              type="number"
              name="mobile"
              id="mobile"
              placeholder="Mobile Number"
              className="login-input"
              {...register("mobile", { required: "Number is required" })}
            />
            {errors.mobile && (
              <p className="error-message">{errors.mobile.message}</p>
            )}
          </div>
          <div className="login-form-group">
            <label htmlFor="password-label">
              <i className="zmdi zmdi-lock"></i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="login-input"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <div className="login-form-group login-form-button">
            <input
              type="submit"
              name="signin"
              className="login-form-submit"
              value="Log in"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    );
};

export default Login;
