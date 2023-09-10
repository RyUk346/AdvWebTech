import axios from "axios";
import React, { useState } from 'react';
import SessionCheck from "../utils/sessionCheck";
import {useRouter}  from 'next/router';



const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      alert('Profile picture updated Successfully!')
      window.location.reload();
      console.log(response.data); // Response from the backend
    } catch (error) {
      console.error('Error uploading file:', error);
      console.error('Axios error details:', error.response); // Log the error response
    }
  };

  return (
    
    <><center>
    <SessionCheck></SessionCheck>
      
      <input type="file" accept=".jpg, .jpeg, .png, .webp, .gif" onChange={handleFileChange} /><br /><br />
              
      <button className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"onClick={handleUpload}>Upload</button><br />    
      </center>
    </>
  );
};

export default FileUploadComponent;
