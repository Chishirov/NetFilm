import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UpdateEmail = () => {
  const emailRef = useRef(null);
  const userContext = useContext(UserContext);

  const updateEmail = async () => {
    try {
      const response = await axios.put('http://localhost:3000/update-email', {
        id: userContext.user._id,
        email: emailRef.current.value 
      });

      alert(response.data);
      emailRef.current.value = '';
    } catch (error) {
      console.error('Fehler beim Aktualisieren der E-Mail-Adresse:', error);
      alert('Fehler beim Aktualisieren der E-Mail-Adresse.');
    }
   
  };

  return (
    <div>
      <div>
        <input style={{ backgroundColor: 'transparent' }} className="flex-grow p-3 sm:p-2 border rounded-md" type="email" placeholder="New Email" ref={emailRef} />
      </div>
      <button className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer" onClick={updateEmail}>UPDATE EMAIL</button>
    </div>
  );
};

export default UpdateEmail;
