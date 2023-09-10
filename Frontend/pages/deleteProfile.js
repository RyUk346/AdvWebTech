import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import dynamic from "next/dynamic";
import { useState } from 'react';


const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})
 
const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})

export default function DeleteCivilian() {
  const [successMessage, setSuccessMessage] = useState('');

const handleDelete = async (e) => {
    e.preventDefault();
    axios.delete('http://localhost:3000/civilian/remove')
      .then((response) => {
        console.log(response);
        setSuccessMessage('Profile deleted successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };
  return (
    <>
     <Title page="deleteprovider"> </Title>
    <Layout>

    <h1>Delete Your Account</h1>
    <button onClick={handleDelete}>Delete</button>  
    <p>{successMessage}</p>
    </Layout>      
    </>
  );
}