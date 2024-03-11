import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UpdatePassword = () => {
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const userContext = useContext(UserContext); // useContext innerhalb der Funktion verwenden

  const updatePassword = async () => {
    try {
      const response = await axios.put('http://localhost:3000/update-password', {
        id: userContext.user._id, 
        password: currentPasswordRef.current.value,
        newPassword: newPasswordRef.current.value
      });

      alert(response.data);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Passworts:', error);
      alert('Fehler beim Aktualisieren des Passworts.');
    }
  };

  return (
    <div>
      <div>
        <input style={{ backgroundColor: 'transparent' }} className="flex-grow p-3 sm:p-2 border rounded-md" type="password" placeholder="Current Password" ref={currentPasswordRef} />
      </div>
      <div>
        <input style={{ backgroundColor: 'transparent' }} className="flex-grow p-3 sm:p-2 border rounded-md" type="password" placeholder="New Password" ref={newPasswordRef} />
      </div>
      <button className="px-8 py-3 rounded-lg size-xxl bg-gray-900 text-white cursor-pointer" onClick={updatePassword}>UPDATE PASSWORD</button>
    </div>
  );
};

export default UpdatePassword;


