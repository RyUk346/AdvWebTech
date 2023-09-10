import axios from "axios";
import Link from "next/link";
import React, { useState } from 'react';
import SessionCheck from "../utils/sessionCheck";

const UpdateCivilianForm = () => {
    const [updateCivilianForm, setUpdateCivilianFormData] = useState({
        name: "",
        email: "",
        contact: 0,
        password: "",
    });
    const handleChange = (e) => {
        setUpdateCivilianFormData({ ...updateCivilianForm, [e.target.name]: e.target.value });
    };

    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        updateCivilianForm.contact = parseInt(updateCivilianForm.contact);
        console.log(updateCivilianForm);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + '/updateinfo', updateCivilianForm,
                {
                    withCredentials: true
                });

            const responseFile = await axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + '/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            console.log(response.data);
            // console.log(responsePhoto.data);
            alert("Civilian Update Successful!");
            window.location.reload();
        } catch (error) {
            console.error('Error Civilian Update:', error);
            alert("Civilian Update Failed!");
        }
    };

    return (
        <>
             <SessionCheck /> 

            <br></br> <br></br>
            <div class="flex flex-wrap justify-center">
                <div>
                    <h3 class="text-center mb-4 text-3xl font-bold text-black"> Update Information - Civilian </h3>
                    <form class="mt-4" onSubmit={handleSubmit}>
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-black">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-black">Email address</label>
                            <input type="email" id="email" name="email" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div class="mb-6">
                            <label for="contact" class="block mb-2 text-sm font-medium text-black">Contact number</label>
                            <input type="tel" id="contact" name="contact" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 text-sm font-medium text-black">Password</label>
                            <input type="password" id="password" name="password" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image File</label>
                            <input id="file_input" type="file" accept=".jpg, .jpeg, .png, .webp, .gif" onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" />
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG, WEBP or GIF (MAX. 300kb).</p>
                        </div>

                        <center>
                            <button type="submit" class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">UPDATE</button>
                            <br></br><br></br>
                        </center>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UpdateCivilianForm;