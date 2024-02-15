import axios from "axios";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(true);

  const [user, setUser] = useState({}); //! --------- useContext
  const backendUrl = "http://localhost:3000"; //! --------- app.jsx axios.default

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${backendUrl}/register`,
        { username, email, password },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Error registering", error);
    }
    setLogin(false);
    <Navigate to={"/"} />;
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (!data) throw new Error();
      setUser(data);
      console.log("login user", user);
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  return (
    <div>
      <div>
        {login && (
          <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block mb-2 text-m font-medium text-black dark:text-black">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="shadow-sm bg-white border border-black  text-black  text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black  dark:border-black  dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@email.com"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-m font-medium text-black  dark:text-black">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                type="password"
                id="password"
                className="shadow-sm bg-white border border-black  text-black  text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black  dark:border-black  dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <a
                className="ms-2 text-m font-medium text-gray-500 underline  dark:text-black cursor-pointer"
                onClick={(e) => setLogin(false)}
              >
                I don't have an account
              </a>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      <div>
        {!login && (
          <form className="max-w-sm mx-auto" onSubmit={handleRegister}>
            <div className="mb-5">
              <label className="block mb-2 text-m font-medium text-black  dark:text-black">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                type="text"
                id="username"
                className="shadow-sm bg-white border border-black  text-black  text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black  dark:border-black  dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-m font-medium text-black  dark:text-black">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="shadow-sm bg-white border border-black  text-black  text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black  dark:border-black  dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@email.com"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-m font-medium text-black  dark:text-black">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                className="shadow-sm bg-white border border-black  text-black  text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black  dark:border-black  dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <a
                className="ms-2 text-m font-medium text-gray-500  dark:text-black underline cursor-pointer"
                onClick={(e) => setLogin(true)}
              >
                I already have an account
              </a>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-m px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
