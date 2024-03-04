import { useRef, useState } from "react";
import "./register.scss";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const startHandler = () => {
        setEmail(emailRef.current.value);
        console.log(email);
    };

    const finishHandler = () => {
        if (passwordRef.current.value.length < 6) {
            passwordRef.current.setCustomValidity("Password must be at least 6 characters long!");
        } else {
            setPassword(passwordRef.current.value);
            alert(`${email} Welcome to the site NetFilm!`);
            console.log(password);
        }
    };

    return (
        <div className="register">
            <div className="header">
                <div className="wrapper">
                    <div className="logo div-logo">
                        <img className="img-1" src="src/assets/movie-logo.png" alt="" />
                        <img className="img-2" src="src/assets/logo-no-background.svg" alt="" />
                    </div>

                    <button className="loginButton">Sign In</button>
                </div>
            </div>

            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder="Enter Your Email address" ref={emailRef} />
                        <button className="registerButton" onClick={startHandler}>
                            Get Started
                        </button>
                    </div>
                ) : (
                    <form className="input">
                        <input
                            className="passwordInput"
                            type="password"
                            placeholder="Enter Your Password"
                            ref={passwordRef}
                        />
                        <button className="registerButton" onClick={finishHandler}>
                            Start
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
