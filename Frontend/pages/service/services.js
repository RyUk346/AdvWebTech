import React, { useEffect, useState } from 'react';
import axios from "axios";
import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('../Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('../Layout/title'),{
  ssr: false,
}) 

export default function ServiceHistory() {
  
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/civilian/getAllServices')
      .then((response) => {
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setUserData(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <center>
    <div className="main-content">
      
      <Title page="servicehistory"> </Title>
      <Layout>
        <h1>Service History</h1>
        
        <div className="service-container">
          {userData.map((data, index) => (
            <div className="service-box bg-blue-200" key={index}>
              <p>Service Type: {data.servicetype}</p>
              <p>Details: {data.details}</p>
              <p>Location: {data.location}</p>
              <p>Id:{data.id}</p>
            </div>
          ))}
        </div>
      </Layout>
      <style jsx>{`
        .service-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .service-box {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: calc(33.33% - 20px); /* Adjust the width as needed */
          box-sizing: border-box;
        }

        .bg-300 {
          background-color: #f2f2f2; /* Replace with your desired color */
        }
      `}</style>
      
      
    </div>
    </center>
  );
}
