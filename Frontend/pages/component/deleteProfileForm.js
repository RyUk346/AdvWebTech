import React, { useState } from 'react';
import axios from 'axios';

const DeleteAccountForm = () => {

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account?');
    
        if (confirmed) {
          try {
            const response = await axios.delete(
              process.env.NEXT_PUBLIC_API_BASE_URL + '/remove',
              {
                withCredentials: true,
              }
            );
    
          if (response.data ==username) {
            alert('Account deleted successfully!');
            router.push('../civilian/login');
            // Perform any additional actions like logging out or redirecting
          } else {
            alert('Failed to delete account');
          }
        } catch (error) {
          alert('An error occurred while deleting the account');
        }
    }
      };

  return (
    
        <center>
          <button onClick={handleDeleteAccount}
            type="submit"
            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Delete Account
          </button>
        </center>
      
    
  );
};

export default DeleteAccountForm;
