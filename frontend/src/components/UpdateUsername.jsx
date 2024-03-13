import React, { useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UpdateUsername = () => {
  const newUsernameRef = useRef(null);
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const updateUsername = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/update-username",
        {
          id:user._id,

          username: newUsernameRef.current.value,
        }
      );

      alert(response.data);
      console.log()

      newUsernameRef.current.value = "";
      await signout();
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Benutzernamens:", error);
      alert("Fehler beim Aktualisieren des Benutzernamens.");
    }
  };
  async function signout() {
    const { data } = await axios.post(
      "http://localhost:3000/signout",
      {},
      { withCredentials: true }
    );
    if (data) {
      alert("You have signed out");
      navigate("/");
      setUser("");
     
    }
  }

  return (
    <div>
      <div>
        <input
          style={{ backgroundColor: "transparent" }}
          className="flex-grow p-3 sm:p-2 border rounded-md"
          type="text"
          placeholder="New Username"
          ref={newUsernameRef}
        />
      </div>
      <button
        className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer"
        onClick={updateUsername}
      >
        UPDATE USERNAME
      </button>
    </div>
  );
};

export default UpdateUsername;
