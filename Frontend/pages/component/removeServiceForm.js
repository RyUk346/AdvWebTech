import axios from "axios";
import React, { useState } from 'react';
import SessionCheck from "../utils/sessionCheck";

const RemoveServiceForm = () => {
    const [serviceData, setServiceData] = useState({
        serviceId: 0,
    });

    const handleChange = (e) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        serviceData.serviceId = parseInt(serviceData.serviceId);
        console.log(serviceData);

        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + '/remove/service/' + serviceData.serviceId,
                {
                    withCredentials: true
                });

            console.log(response.data);
            alert("service Delete Successful!");
            router.push('../civilian/services');
        } catch (error) {
            console.error(error);
            alert("service Delete Failed!");
        }
    };

    return (
        <>
            {/* <SessionCheck /> */}

            <h2 align="center"> Removal Information </h2>

            <div>
                <form onSubmit={handleSubmit}>
                    <center>
                        <table>
                            <tr>
                                <td>service ID:</td>
                                <td><input type="number" name="serviceId" placeholder="whom to remove" onChange={handleChange} required /></td>
                            </tr>
                        </table>

                        <br></br>
                        {/* <input type="submit" name="service_remove" value="REMOVE"></input> */}
                        <input type="submit" name="removebutton" value="REMOVE"></input>
                    </center>
                </form>
            </div>
        </>
    )
};

export default RemoveServiceForm;