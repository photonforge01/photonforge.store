import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
// import OAuth from "../components/OAuth";
// import Login from "../components/Login";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { db } from "../firebase";
// import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { validateUserJWTTOken } from "../api";
// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
    picture : null
  });

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  //   const [{}, dispatch] = useStateValue();

  const { name, lastname, email, password, confpassword,picture } = formData;
  console.log(formData);
  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const link = "http://localhost:4001";
  async function handleSignup(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${link}/api/v1/auth/register`,
        formData
      );
      console.log(response);
      const { user, token } = response.data;
      console.log(user);
      console.log(token);
      dispatch({
        type: actionType.REGISTER_USER_SUCCESS,
        user: user,
        token: token,
      });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (err) {
      const responseText = err.response.data;

      console.log(responseText);
      toast.error(responseText.msg);
      console.log(err);
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  const [seen, setSeen] = useState(false);
  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <div
      className="flex justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url("./pasta.jpg")` }}
    >
      <div className="w-full max-w-sm bg-white rounded-lg p-6 grid">
        <h2 className="text-2xl text-center mb-6">Login</h2>
        <form onSubmit={handleSignup} className="bg-slate-200 p-5 rounded-md">
          <label className="mb-4">
            name:
            <input
              className="input-field w-full"
              type="text"
              id="name"
              value={name}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-4">
            lastname:
            <input
              className="input-field w-full"
              type="text"
              id="lastname"
              value={lastname}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-4">
            Email:
            <input
              className="input-field w-full"
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
            />
          </label>
          <div className="relative mb-4">
            <label className="mb-2">
              Password:
              <input
                className="input-field pr-10 w-full"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleInputChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute top-11 transform -translate-y-1/2 right-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute transform -translate-y-1/2 right-3 top-11 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </label>
          </div>

          <div className="relative mb-4">
            <label className="mb-2">
              Confirm Password:
              <input
                className="input-field pr-10 w-full"
                type={showPassword ? "text" : "password"}
                id="confpassword"
                value={confpassword}
                onChange={handleInputChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute top-11 transform -translate-y-1/2 right-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute transform -translate-y-1/2 right-3 top-11 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </label>
          </div>

          <div className="flex justify-between mb-4">
            <p>
              Already have an account?
              <button
                className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out ml-1"
                onClick={togglePop}
              >
                Login
              </button>
              {/* {seen && <Login toggle={togglePop} />} */}
            </p>
            <p>
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-700 transit ion duration-200 ease-in-out ml-1"
              >
                Forgot Password
              </Link>
            </p>
          </div>
          <button
            className="w-full bg-blue-600 text-white font-medium uppercase hover:bg-blue-800 transition duration-150 ease-in-out shadow-lg py-2"
            type="submit"
          >
            Sign Up
          </button>
          <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          {/* <OAuth /> */}
        </form>
        <button onClick={togglePop}>Close</button>
      </div>
    </div>
  );
}
