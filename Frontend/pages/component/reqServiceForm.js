import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import SessionCheck from '../utils/sessionCheck';

const RequestServiceForm = () => {
    const [serviceData, setServiceData] = useState({

        servicetype: "",
        contact: 0,
        location:"",
        details:"",
        
    });

    const handleChange = (e) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        serviceData.contact = parseInt(serviceData.contact);
        
        console.log(serviceData);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/addService', serviceData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(response.data);
            alert("Service Requested Successful!");
        } catch (error) {
            console.error('Service could not request:', error);
            alert("Service could not request right now!");
        }
    };

    return (
        <>
          <SessionCheck /> 

            <br></br> <br></br>
            <div class="flex flex-wrap justify-center z-1 relative">
                <div>
                    <h3 class="text-center mb-4 text-3xl font-bold text-black"> Request Service </h3>
                    <form class="mt-4" onSubmit={handleSubmit}>
                        <div class="mb-6">
                            <label for="servicetype" class="block mb-2 text-sm font-medium text-black">Service Type</label>
                            <select id="servicetype" name="servicetype" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                            <option value="Women Service">Women Service</option>
                            <option value="Health Service">Health Service</option>
                            </select>
                        </div>
                        
                        <div class="mb-6">
                            <label for="contact" class="block mb-2 text-sm font-medium text-black">Contact number</label>
                            <input type="tel" id="contact" name="contact" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                       
                        <div class="mb-6">
                            <label for="location" class="block mb-2 text-sm font-medium text-black">Location</label>
                            <input type="text" id="location" name="location" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div class="mb-6">
                            <label for="details" class="block mb-2 text-sm font-medium text-black">Details</label>
                            <input type="text" id="details" name="details" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <center>
                            <button type="submit" class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
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

export default RequestServiceForm;