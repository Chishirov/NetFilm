import { useRef, useState } from "react";
import "./login.scss"; // Corrected import path

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();

    const clickHandler = () => {
        if (passwordRef.current.value.length < 6) {
            passwordRef.current.setCustomValidity("Password must be at least 6 characters long!");
        } else {
            setEmail(emailRef.current.value);
            setPassword(passwordRef.current.value);
            alert(`${email} Welcome to the site NetFilm!`);
        }
    };

    return (
        <div className="login">
            <div className="header">
                <div className="wrapper">
                    <div className="div-logo">
                        <img className="img-1" src="src/assets/movie-logo.png" alt="" />
                        <img className="img-2" src="src/assets/logo-no-background.svg" alt="" />
                    </div>
                    <button className="loginButton">Sign Out</button>
                </div>
            </div>
            <div className="container">
                <div className="background-img">
                    <img src="src/assets/BG-L.png" alt="" />
                </div>
                <div className="opacity-layer"></div>
                <form className="login-form">
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        ref={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="loginButton" onClick={clickHandler}>
                        Sign In
                    </button>
                    <span>
                        New to NetFilm? <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
                        <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
