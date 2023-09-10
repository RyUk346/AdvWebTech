import React from 'react';
import axios from 'axios';
import SessionCheck from '../utils/sessionCheck';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import Link from 'next/link';




const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });

const DeleteCivilianAccount = () => {
    const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + '/remove', {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(response.data);
        alert("Account Deleted Successfully!");
        await Logout();
        router.push('/civilian/login');
        // You might want to redirect the user to a different page after deletion
      } else {
        console.error('Account could not be deleted.');
        alert("Account could not be deleted.");
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert("An error occurred while deleting the account.");
    }
  };


  const Logout = async () => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/logout', null, {
        withCredentials: true,
      });

      if (response.status === 201) {
        sessionStorage.removeItem('username');
        document.cookie = ''; // Clear cookies
      } else {
        console.error('Sign-out failed:', response);
      }
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <div>
      <Title page="Delete Account"/>
      <Layout>
      <center>
      <SessionCheck />
      <h3 class="text-center text-2xl  font-mono font-bold">Are you sure to delete Account?</h3>
      <button className="border border-red-500 p-2 text-red-500 btn-outline w-20 rounded-full hover:bg-green-300 hover:text-white" onClick={handleDelete}>Yes</button>
      <Link href="../civilian/profile"><button className="border border-red-500 p-2 text-red-500 btn-outline w-20 rounded-full hover:bg-green-300 hover:text-white" >No</button></Link>
      </center>
      </Layout>
    </div>
  );
};

export default DeleteCivilianAccount;