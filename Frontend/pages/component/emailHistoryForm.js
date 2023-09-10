import axios from "axios";
import React, { useState, useEffect } from 'react';
import Title from "../Layout/title";
import SessionCheck from "../utils/sessionCheck";
import { useRouter } from 'next/router';
const EmailHistory = () => {
    const [emailDataList, setEmailDataList] = useState([]);
    const router=useRouter();
    const  providerID = router.query.id;
    useEffect(() => {
        getEmail();
    }, []);


    const getEmail = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/emailHistory', {
                withCredentials: true // Include session cookies
            });

            setEmailDataList(response.data); // Set the array of service data
            console.log(response.data);
        } catch (error) {
            console.log('Error Fetching Email Data:', error);
        }
    };

    return (
        <>
            <Title title="Emails" />
            <h3 class="text-center mb-4 text-2xl font-bold text-black"> Email History </h3>
            <div className="border border-gray-300 p-4 flex flex-wrap justify-center">
                <SessionCheck />
                

                {emailDataList.map((emailData, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h5>To: {emailData.receiver}</h5>
                        <h5>Subject: {emailData.subject}</h5>
                        <p>Message: {emailData.message}</p>
                        
                        
                    </div>
                ))}
            </div>
        </>
    );
};

export default EmailHistory;