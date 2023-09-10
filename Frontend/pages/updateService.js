import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';


export default function editService() {
  const router = useRouter();
  const { id, servictype, location, contact, password } = router.query;
  const [updatedServiceType, setUpdatedServiceType] = useState(servictype || '');
  const [updatedLocation, setUpdatedLocation] = useState(location || '');
  const [updatedContact, setUpdatedContact] = useState(contact || '');
  const [updatedPassword, setUpdatedPassword] = useState(password || '');
  const [error, setError] = useState('');


  const handleChangeServiceType = (e) => {
    setUpdatedServiceType(e.target.value);
  };
  const handleChangeLoaction = (e) => {
    setUpdatedLocation(e.target.value);
  };
  const handleChangeContact = (e) => {
    setUpdatedContact(e.target.value);
  };
  const handleChangePassword = (e) => {
    setUpdatedPassword(e.target.value);
  };
  const handleEditForm = async () => {
    if (!updatedServiceType || !updatedLocation || !updatedContact || !updatedPassword) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.put('http://localhost:3000/civilian/updateservice/${id}', {
          servicetype: updatedServiceType,
          location: updatedLocation,
          contact: updatedContact,
          password: updatedPassword,
        });
        if (response.data === "Don't find any appointment") {
          setError('Error updating appointment');
        } else {
          setError('');
          router.push('/View_all_appointment')
        }
      } catch (error) {
        console.error('Failed:', error);
        if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', error.response.data);
          }
        
      }
    }
  };

  return (
    <div>
      
      <h1>Edit Service</h1>

      <label >Service Type:</label>
      <input type="text" id="servicetype" value={updatedServiceType} required onChange={handleChangeServiceType} />
      <br />
      <label >Location:</label>
      <input type="text" id="location" value={updatedLocation} required onChange={handleChangeLoaction} />
      <br />
      <label >Contact:</label>
      <input type="number" id="contact" value={updatedContact} required onChange={handleChangeContact} />
      <br />
      <label >Password:</label>
      <input type="password" id="password" value={updatedPassword} required onChange={handleChangePassword} />
      <br />
      {error && <p>{error}</p>}

      <input type="submit" value="Save" onClick={handleEditForm} />

      
    </div>
  );
}