import { useState, useContext } from "react";
import "./register.scss";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
// // ______________________________________________
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Avatar,
// } from "@material-tailwind/react";
// // _________________________________________________
const LandingPage = () => {

  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [redirect, setRedirect] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      if (!data) throw new Error();
      if (data.isAdmin === true) {
        setAdmin(true);
      }
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.log("Login failed", error.response.data);
      alert("Login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/home"} />;
  } else {
    <Navigate to={"/"} />;
  }
  return (
    <div className="register">
      <div className="header">
      <div className="opacity-layer"></div>
        <div className="wrapper">
          <div className="logo div-logo">
            <img className="img-1" src="src/assets/movie-logo.png" alt="" />
            <img
              className="img-2"
              src="src/assets/logo-no-background.svg"
              alt=""
            />
          </div>

          {/* <button className="loginButton">Sign In</button> */}
        </div>
      </div>

      <div className="container">
        {/* <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p> */}
        {!hasEmail ? (
          <div className="input">
            <input
              className="passwordInput"
              type="email"
              name="email"
              placeholder="Enter Your Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //   ref={emailRef}
            />
            <button
              className="registerButton"
              onClick={() => setHasEmail(true)}
            >
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              className="passwordInput"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //   ref={passwordRef}
            />
            <button className="registerButton" onClick={handleLogin}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
