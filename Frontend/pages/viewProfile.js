import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SessionCheck from './utils/sessionCheck';
import Layout from './Layout/layout';

const Profile = () => {
  const [civilianData, setCivilianData] = useState([]);

  useEffect(() => {
    getCivilian();
  }, []);

  const getCivilian = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/profile', {
        withCredentials: true,
      });

      setCivilianData(response.data); // Use response.data instead of response.civilianData
      console.log(response.data);
    } catch (error) {
      console.log('Error Fetching Civilian Data:', error);
    }
  };

  return (
    <>
    <SessionCheck/>
      {/* Your SessionCheck component */}
      <center>
        <div>
       
    <Layout>
          {/* Your Title and Layout components */}
          <h1>Profile</h1>
          <div>
            {civilianData.map((data, index) => (
              <div key={index}>
                <p>Service Type: {data.username}</p>
                <p>Contact: {data.name}</p>
                <p>Location: {data.contact}</p>
              </div>
            ))}
            
          </div>
          </Layout>
        </div>
        
      </center>
      
    </>
  );
};

export default Profile;
