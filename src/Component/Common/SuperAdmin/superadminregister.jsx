import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./test2.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [panError, setPanError] = useState("");
  const [adhError, setAdhError] = useState("");

  useEffect(() => {
    if (selectedCountry) setStates(State.getStatesOfCountry(selectedCountry));
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState)
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
  }, [selectedCountry, selectedState]);
  const handleChange = (key, value) => {
    const AllCountryDetail = {
      country: setSelectedCountry,
      state: setSelectedState,
      city: setSelectedCity,
    };
    AllCountryDetail[key](value);
  };

  const [adhfile, setadhfile] = useState(null);
  const [panfile, setpanfile] = useState(null);
  const [adhimg, setadhimg] = useState(null);
  const [panimg, setpanimg] = useState();
  const [imgdatapin , setimgdatapin] = useState('')
  const [imgdataadh , setimgdataadh] = useState('')


  // useEffect(() => {
  //   // This will log the values after the state has been updated
  //   console.log(adhimg);
  //   console.log(panimg);
  //   console.log(adhfile);
  //   console.log(panfile);
  // }, [adhfile, adhimg, panfile, panimg]);


  const handleFileChange1 = (e) => {
    const file1 = e.target.files[0];
    setimgdatapin(file1)
    if (!file1 || file1.length === 0) {
      setPanError("Pan Card is required");
      // setpanimg(null);
      // setpanfile(null);
    } else {
      setPanError("");
      var reader1 = new FileReader();
      reader1.readAsDataURL(file1);
      reader1.onload = () => {
        setpanimg(reader1.result);
      };
      setpanfile(file1);
    }
  };

  const handleFileChange2 = (e) => {
    const file2 = e.target.files[0];
    setimgdataadh(file2)
    if (!file2 || file2.length === 0) {
      setAdhError("Aadhar Card is required");
      setadhimg(null);
      setadhfile(null);
    } else {
      setAdhError("");
      var reader2 = new FileReader();
      reader2.readAsDataURL(file2);
      reader2.onload = () => {
        setadhimg(reader2.result);
      };
      setadhfile(file2);
    }
  };

  const onSubmit = async (data) => {
    console.log(data)
    if (!panfile) {
      setPanError("Pan Card is required");
      return;
    }

    if (!adhfile) {
      setAdhError("Aadhar Card is required");
      return;
    }
    const formData = new FormData();
    formData.append('panimg', imgdatapin);
    formData.append('adhimg', imgdataadh);
    // console.log(adhfile)
    console.log(imgdatapin,12345)
    console.log(imgdataadh,3464848)
    
    const RegData = {
      name:data.name,
      mobilenum:data.mobile,
      email:data.email,
      gender:data.gender,
      password:data.password,
      confirmpassword:data.ConfirmPassword,
      location:data.location,
      aadharnum:data.AadarNum
    } 
    console.log(RegData);

    try {
      const response = await axios.post(
        "https://89a8-2401-4900-1c08-7658-ec3a-e43b-4210-c5fa.ngrok-free.app/client_register",
        formData
      );
      console.log("image Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await axios.post(
        "https://89a8-2401-4900-1c08-7658-ec3a-e43b-4210-c5fa.ngrok-free.app/client_register",
        RegData
      );
      console.log("reg data Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    
  };

  return (
    <>
      <div className="bg-menu-theme">
        <div className="container-full  p-5">
          <div className="row">
            <div className="col-md-3 text-center text-white mt-5 pt-5">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3>Welcome</h3>
              <p>You are 30 seconds away from earning your own money!</p>
            </div>
            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h2 className="text-center mt-3 mb-1  text-dark">
                    REGISTRATION FORM
                  </h2>
                  <form
                    className="row px-5 pb-3 w-100"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="col-md-6 px-5">
                      <div className="form-group  my-4">
                        <TextField
                          {...register("name", {
                            required: "First Name Required.",
                          })}
                          label="Name"
                          error={errors.name}
                          helperText={errors.name?.message}
                          variant="standard"
                        />
                      </div>
                      <div className="form-group  my-4">
                        <TextField
                          {...register("email", {
                            required: "Email is required.",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          label="Email"
                          error={errors.email}
                          helperText={errors.email?.message}
                          variant="standard"
                        />
                      </div>
                      <div className="form-group  my-4">
                        <TextField
                          {...register("password", {
                            required: "Password is required.",
                            minLength: {
                              value: 6,
                              message:
                                "Password should have at least 6 characters",
                            },
                          })}
                          label="Password"
                          type="password"
                          error={errors.password}
                          helperText={errors.password?.message}
                          variant="standard"
                        />
                      </div>
                      <div className="form-group  my-4">
                        {["Country", "State", "City"].map((key) => (
                          <FormControl
                            key={key}
                            variant="standard"
                            sx={{ minWidth: 90, marginX: 1 }}
                          >
                            <InputLabel id={`${key.toLowerCase()}-label`}>
                              {key}
                            </InputLabel>
                            <Select
                              {...register("location", {
                                required: "Please select an option",
                              })}
                              labelId={`${key.toLowerCase()}-label`}
                              id={`${key.toLowerCase()}-select`}
                              value={
                                key === "Country"
                                  ? selectedCountry
                                  : key === "State"
                                  ? selectedState
                                  : selectedCity
                              }
                              onChange={(e) =>
                                handleChange(key.toLowerCase(), e.target.value)
                              }
                            >
                              {key === "Country"
                                ? Country.getAllCountries().map((country) => (
                                    <MenuItem
                                      key={country.isoCode}
                                      value={country.isoCode}
                                    >
                                      {country.name}
                                    </MenuItem>
                                  ))
                                : key === "State"
                                ? states.map((state) => (
                                    <MenuItem
                                      key={state.isoCode}
                                      value={state.isoCode}
                                    >
                                      {state.name}
                                    </MenuItem>
                                  ))
                                : cities.map((city) => (
                                    <MenuItem key={city.name} value={city.name}>
                                      {city.name}
                                    </MenuItem>
                                  ))}
                            </Select>
                            {errors.location && (
                              <p className="error">{errors.location.message}</p>
                            )}
                          </FormControl>
                        ))}
                      </div>
                      <div className="form-group  my-4">
                        <h5 htmlFor="" className="mt-2 mb-3">
                          Upload Your Pan Card
                        </h5>
                        <div className="file-upload-container d-block">
                          <label
                            htmlFor="file-input-pan"
                            className="file-upload-label"
                          >
                            <div className="file-upload-box">
                              {panimg ? (
                                <img
                                  src={panimg}
                                  alt="Uploaded"
                                  className="file-icon-1"
                                />
                              ) : (
                                <FontAwesomeIcon icon={faImage}/>
                              )}
                              {panfile ? (
                                <div className="file-name">{panfile.name}</div>
                              ) : (
                                <div className="file-placeholder">
                                  Choose a file
                                </div>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input-pan"
                            onChange={handleFileChange1}
                            style={{ display: "none" }}
                          />
                          {panError && <p className="error">{panError}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 px-5">
                      <div className="form-group  my-4">
                        <TextField
                          {...register("mobile", {
                            required: "Mobile number is required.",
                            pattern: {
                              value: /^[0-9]{10}$/i,
                              message: "Invalid mobile number",
                            },
                          })}
                          label="Mobile Number"
                          error={errors.mobile}
                          helperText={errors.mobile?.message}
                          variant="standard"
                        />
                      </div>
                      <div className="form-group  my-4">
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="gender"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                            {...register("gender", {
                              required: "Gender is required",
                            })}
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                            {...register("gender", {
                              required: "Gender is required",
                            })}
                          />
                        </RadioGroup>
                        {errors.gender && (
                          <p className="error">{errors.gender.message}</p>
                        )}
                      </div>
                      <div className="form-group  my-4">
                        <TextField
                          {...register("ConfirmPassword", {
                            required: "Password is required.",
                            minLength: {
                              value: 6,
                              message:
                                "Password should have at least 6 characters",
                            },
                          })}
                          label="Confirm Password"
                          type="password"
                          error={errors.ConfirmPassword}
                          helperText={errors.ConfirmPassword?.message}
                          variant="standard"
                        />
                      </div>
                      <div className="form-group  my-4">
                        <TextField
                          {...register("AadarNum", {
                            required: "Aadar Number Required.",
                          })}
                          label="Aadhar Card Number"
                          error={errors.AadarNum}
                          helperText={errors.AadarNum?.message}
                          variant="standard"
                        />
                      </div>
                      <div className="form-group  my-4">
                        <h5 htmlFor="" className="mt-2 mb-3">
                          Upload Your Aadhar Card
                        </h5>
                        <div className="file-upload-container d-block">
                          <label
                            htmlFor="file-input-adhar"
                            className="file-upload-label"
                          >
                            <div className="file-upload-box">
                              {adhimg ? (
                                <img
                                  src={adhimg}
                                  alt="Uploaded"
                                  className="file-icon-2"
                                />
                              ) : (
                                <FontAwesomeIcon icon={faImage}/>
                              )}
                              {adhfile ? (
                                <div className="file-name">{adhfile.name}</div>
                              ) : (
                                <div className="file-placeholder">
                                  Choose a file
                                </div>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input-adhar"
                            onChange={handleFileChange2}
                            style={{ display: "none" }}
                          />
                          {adhError && <p className="error">{adhError}</p>}
                        </div>
                      </div>
                      <div className="form-group text-end my-4">
                        <Button variant="contained" type="submit">
                          Register
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
