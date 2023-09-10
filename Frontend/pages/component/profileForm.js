import axios from "axios";
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";


import SessionCheck from "../utils/sessionCheck";

const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,});

const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,});
const CivilianProfileForm = () => {
    const [civilianData, setCivilianData] = useState({});

    useEffect(() => {
        getCivilian();
    }, []);

    const getCivilian = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/profile', {
                withCredentials: true // Include session cookies
            });

            setCivilianData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error Fetching Civilian Data:', error);
        }
    };

    return (
        <>
            <Title page="Profile" />
            <div>
                <Layout>
                <SessionCheck />
                <br></br>
                
                <div class="flex flex-col items-center pb-10 border">
                            
                <img src={process.env.NEXT_PUBLIC_API_BASE_URL+ `/photo?${Date.now()}`} class="w-60 h-50 mb-3 rounded-full shadow-xl" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{civilianData.name}</h5>

                <div className="flex flex-col items-center pb-10">
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <center>
                            <p>Email : {civilianData.email}</p>
                            <p>Contact : {civilianData.contact}</p>
                        </center>
                    </div>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <a href="../civilian/updateProfile" className="border border-red-500 p-2 text-red-500 btn-outline w-50 rounded-full hover:bg-green-300 hover:text-white">Edit Profile</a><br />
                    </div><br/><a href="../civilian/deleteProfile" className="border border-red-500 p-2 text-red-500 btn-outline w-50 rounded-full hover:bg-red-300 hover:text-white">Delete Profile</a>
                </div>
                </div>
                </Layout>
            </div>
            
        </>
    );
};

export default CivilianProfileForm;
