import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import SessionCheck from '../utils/sessionCheck';

const AddProvider = () => {
    const [ProviderData, setProviderData] = useState({

            name:"",     
            username:"",        
            email:"", 
            contact:0,
            age:0,
            service:"",
   
        
    });




    const handleChange = (e) => {
        setProviderData({ ...ProviderData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        ProviderData.contact = parseInt(ProviderData.contact);
        ProviderData.age = parseInt(ProviderData.age);
        
        console.log(ProviderData);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/regserviceProvider', ProviderData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(response.data);
            alert("Provider Added Successful!");
            
        } catch (error) {
            console.error('Provider could not added:', error);
            alert("Provider could not added!");
        }
    };

    return (
        <>
          <SessionCheck /> 
          
            <br></br> <br></br>
         
            <div class="flex flex-wrap justify-center z-1 relative">
                <div>
                    <h3 class="text-center mb-4 text-3xl font-bold text-black"> Provider Registration </h3>
                    <form class="mt-4" onSubmit={handleSubmit}>
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-black"> Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        
                        <div class="mb-6">
                            <label for="username" class="block mb-2 text-sm font-medium text-black">Username</label>
                            <input type="text" id="username" name="username" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                       
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-black">Email</label>
                            <input type="email" id="email" name="email" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div class="mb-6">
                            <label for="contact" class="block mb-2 text-sm font-medium text-black">Contact</label>
                            <input type="number" id="contact" name="contact" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div class="mb-6">
                            <label for="age" class="block mb-2 text-sm font-medium text-black">Age</label>
                            <input type="number" id="age" name="age" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div class="mb-6">
                            <label for="service" class="block mb-2 text-sm font-medium text-black">Service Type</label>
                            <input type="text" id="service" name="service" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <center>
                            <button type="submit" class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                        </center>

                        <center>
                            <br></br><br></br>
                        </center>
                    </form>
                </div>
            </div>
          
          
    </>
)
};

export default AddProvider;