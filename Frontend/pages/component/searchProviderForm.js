import axios from "axios";
import React, { useState } from 'react';

import SessionCheck from "../utils/sessionCheck";

const SearchProviderForm = () => {
    const [ProviderId, setProviderId] = useState("");
    const [ProviderData, setProviderData] = useState(null);

    const handleChange = (e) => {
        setProviderId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/search/serviceProvider/'+ ProviderId,
                {
                    withCredentials: true
                });
            
            console.log(response.data);
            setProviderData(response.data); // Store the fetched Provider data in state
        } catch (error) {
            console.error(error);
            setProviderData(null); // Clear Provider data if search fails
            alert("Provider Search Failed!");
        }
    };

    return (
        <>
            <SessionCheck /> 

            <div>
                <form onSubmit={handleSubmit}>
                    <center>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Provider ID:</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="ProviderId"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-90 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            placeholder="Enter Provider ID to search"
                                            value={ProviderId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br />

                        <input type="submit" className="border border-red-500 p-2 text-red-500 btn-outline w-50 rounded-full hover:bg-green-300 hover:text-white" name="searchButton" value="SEARCH" />
                    </center>
                </form>
                
                {ProviderData && (
                    <div>
                        <h2>Provider Details:</h2>
                        <p>Provider ID: {ProviderData.id}</p>
                        <p>Provider Name: {ProviderData.name}</p>
                        <p>Provider Username: {ProviderData.username}</p>
                        <p>Provider Email: {ProviderData.email}</p>
                        <p>Provider Contact: {ProviderData.contact}</p>
                        <p>Provider Age: {ProviderData.age}</p>
                    
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchProviderForm;