import React, { useState } from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";


const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})


export default function UpdateProfile() {
  const data = { name: '', email: '', password: '' };
  const [inputData, setInputData] = useState(data);
  const [successMessage, setSuccessMessage] = useState('');

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/civilian/updateinfo', inputData)
      .then((response) => {
        console.log(response);
        setSuccessMessage('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };
  return (
    <div>
      <Title page="updateprofile"> </Title>
    <Layout>
      <h2>Update Profile</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={inputData.name}
          onChange={handleData}
        />
      </div>
      <br />
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={inputData.email}
          onChange={handleData}
        />
      </div>
      <br />
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={inputData.password}
          onChange={handleData}
        />
      </div>
      <br />
      <button onClick={handleUpdate}>Update Profile</button><br />
      <p>{successMessage}</p>
      </Layout>
    </div>
  );
}