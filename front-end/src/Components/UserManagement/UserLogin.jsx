import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserServices from "../Service/UserServices";
import Swal from "sweetalert2";
import "../UserManagement/Login.css";

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const LoginForm = (params) => {
  const [regNumber, setregNumber] = useState("");
  const [password, setpassword] = useState("");
  const nav = useNavigate();
  const {
    userDetails,
    setUserDetails,
    isAuthenticated,
    setIsAuthenticated,
    userName,
    setUserName,
  } = useContext(AuthContext);
  useEffect(() => {}, []);

  const submitClicked = (e) => {
    e.preventDefault();
    const loginTemplate = {
      regNumber,
      password,
    };

    UserServices.login(loginTemplate)
      .then((res) => {
        // setstudent(res.data)
        console.log(res.data);
        if (res.data.role === "student") {
          console.log("true:student");
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          nav("/StudentHome");
        } else if (res.data.role === "admin") {
          console.log("true:admin");
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          // nav("/AdminHome")
          nav("/AdminHome");
        } else if (res.data.role === "lecture") {
          console.log("true:lecture");
          setUserDetails(res.data);
          setIsAuthenticated(true);
          usernamesetter(res.data);
          // nav("/AdminHome")
          nav("/Lecture");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "User Name OR Password In correct!",
        });
        console.log("failed");
      });
    // nav("/students")

    console.log(loginTemplate);
  };

  const usernamesetter = (e) => {
    UserServices.getUser(e.userID).then((Response) => {
      setUserName(Response.data.lastName);
    });
  };
  return (
    <div>
      <div class="boxlog mt-5">
        <h1>Sign In</h1>

        <form onSubmit={submitClicked}>
          <div class="inputlog">
            <input
              type="text"
              name="email"
              placeholder="Registration number"
              onChange={(e) => {
                setregNumber(e.target.value);
              }}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
          </div>

          <input type="submit" value="Sign in" className="sub " />
        </form>

        <p>
          Don't have an accunt? <a href="/user/-1"> Create Account</a>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
