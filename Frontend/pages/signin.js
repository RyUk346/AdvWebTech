import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from './utils/authcontext';
import { useRouter } from 'next/router'; 
import SessionCheck from './utils/sessionCheck';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Layout/header'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})
export default function Signin() {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login= useAuth();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
    }else if (!isValidUserName(username)) {
      setError('Invalid Username');
    } 
    else {
      const res=await doSignIn(username, password)
      console.log(res);
    }
  };
  async function doSignIn(e) {
       try {
        const response = await axios.post('http//:localhost:3000/civilian/login', {
          username,
          password
        },
        {
          
          withCredentials: true
        });
        if (response.data == true) {
          console.log("cookie: " + document.cookie);
          login(username, document.cookie);
          router.push('/profile');
        }
        else {
          setError("Invalid user");
        }
        console.log("response:"+ response);
        console.log(response.data)
        return response.data;

      } catch (error) {
        setError('Login failed. Please check your username and password.');
        console.error('Login failed:', error);
      }
    }
    const isValidUserName = (username) =>{
      const usernamePattern=/^[a-zA-Z0-9@._$]+$/;
      return usernamePattern.test(username);
    };
  

  return (
    <div>
      <center>
       <Title page="Sign In"></Title>
<SessionCheck/>


<h1>Sign in to your account</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChangeUsername}
          />
        </div>
        <br></br>
        <div>
          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <br></br>
        {error && <p>{error}</p>}
        <button type="submit" className="btn  btn-outline rounded-full glass hover:bg-blue-500" >Login</button>
        
    <Link href="forgotpassword">Forgotten account?</Link><br></br><br></br>

</form>

<label>Create a new Account?</label><Link href="/signup">Signup</Link>
      
      </center>
    </div>
  );
};


