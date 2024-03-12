import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UpdateEmail = () => {
  const emailRef = useRef(null);
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const updateEmail = async () => {
    try {
      const response = await axios.put('http://localhost:3000/update-email', {
        id: user._id,
        email: emailRef.current.value 
      });

      alert(response.data);
      emailRef.current.value = '';
      await signout();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der E-Mail-Adresse:', error);
      alert('Fehler beim Aktualisieren der E-Mail-Adresse.');
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
      <p>{user?.email}</p>
      <div>
        <input style={{ backgroundColor: 'transparent' }} className="flex-grow p-3 sm:p-2 border rounded-md" type="email" placeholder="New Email" ref={emailRef} />
      </div>
      <button className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer" onClick={updateEmail}>UPDATE EMAIL</button>
    </div>
  );
};

export default UpdateEmail;
