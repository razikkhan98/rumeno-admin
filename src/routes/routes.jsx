import { Route, Routes } from "react-router-dom";
import AdminCartUpload from "../Component/Common/AdminCartUpload";
import Home from "../Component/Pages/Home";
import BlogUpload from "../Component/Common/AdminBlogUpload";
import TransactionDetails from "../Component/Common/TransactionDetails";
import Login from "../Component/Pages/Login/login";

import { useContext } from "react";
import { UserContext } from "../Component/Common/UseContext/useContext";
import { useEffect } from "react";

function AuthRoutes() {
    const { setUserLogin, UserLogin } = useContext(UserContext);
    useEffect(() => {
        let getvalue = JSON.parse(localStorage.getItem("loginDetails") ?? '[]')
        setUserLogin(getvalue?.name)
        console.log('getvalue: ', getvalue.name);
    }, [])


    console.log('UserLogin: ', UserLogin);


    return (
        <>
            <Routes>

                {!UserLogin ? (
                    <>
                        <Route path="/" element={<Login />} />

                    </>
                ) : (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/uploadproduct" element={<AdminCartUpload />} />
                        <Route path="/upload-blog" element={<BlogUpload />} />
                        <Route
                            path="/transaction-details"
                            element={<TransactionDetails />}
                        />
                    </>

                )}
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
}

export default AuthRoutes;
