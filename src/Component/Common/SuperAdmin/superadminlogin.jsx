import React from "react";
import "../../assets/vendor/css/core.css";
import "../../assets/vendor/css/theme-default.css";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios';


import admimg1 from "../../assets/img/Logo/admlogimg1.png"
import admimg2 from "../../assets/img/Logo/newlogo.png"

const Adminlogin = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    try {
      const response = await axios.post('https://example.com/api/endpoint',data);
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="bg-menu-theme">
      <div className="container">
        <div className="img d-flex justify-content-start align-items-center">
          <img
            src={admimg1}
            alt="background"
          />
        </div>
        <div className="login-content d-flex justify-content-start align-items-center text-center">
          <form  onSubmit={handleSubmit(onSubmit)}>
            <img
              src={admimg2}
              alt="avatar"
            />
            <h2 className="title m-5">WELCOME</h2>
            <Box sx={{marginY:5}}>
              <TextField sx={{width:350}}
              {...register("UserName", {
                required: "Name Required.",
              })}
                id="outlined-basic"
                label="Name"
                color="info"
                error={errors.UserName}
                          helperText={errors.UserName?.message}
                focused
              />
            </Box>

            <Box sx={{marginY:5}}>
              <TextField sx={{width:350}}
              {...register("Password", {
                required: "Password Required.",
              })}
                id="outlined-basic"
                label="Password"
                color="info"
                focused
                error={errors.Password}
                          helperText={errors.Password?.message}
              />
            </Box>

            <a href="/#" className="my-4 text-warning text-decoration-none">
              Forgot Password?
            </a>
            <Button variant="contained" type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;


