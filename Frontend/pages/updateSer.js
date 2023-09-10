import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UpdateServicePage = () => {
  const router = useRouter();
  const { id } = router.query; // Access the service ID from the URL query

  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  //const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateService = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the service
      const response = await axios.put('http://localhost:3000/civilian/updateservice/${id}', {
        servicetype: serviceType,
        location,
        //contact,
      });
      // Assuming the backend responds with a success message
      setSuccessMessage(response.data.message);
    } catch (error) {
      // Handle errors if the request fails
      setError('Failed to update service. Please try again.');
      console.error('Service update failed:', error);
    }
  };

  return (
    <div>
      <h2>Update Service</h2>
      <form onSubmit={handleUpdateService}>
        <div>
          <label>Service Type</label>
          <input type="text" value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
        </div>
        <div>
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Update Service</button>
      </form>
    </div>
  );
};

export default UpdateServicePage;
