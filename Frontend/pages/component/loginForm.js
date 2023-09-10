import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SessionCheck from '../utils/sessionCheck';

const LoginForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  // const { login } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') // checks if the code is running on the client-side and not on the server-side.
    {
      const session = sessionStorage.getItem('username');
      console.log("session: " + session);

      if (session) {
        setUsername(sessionStorage.getItem('username'));
        console.log(username);
        router.push('../civilian//profile');
      }
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError('');
    setError('');
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setError('');
  }


  const isValidUsername = (username) => {
    const usernamePattern = /^[a-zA-Z0-9@._$]+$/;
    return usernamePattern.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError('');
    setPasswordError('');
    setError('');

    if(!username && !password) {
      setError('Username and password are required');
    }

    else if (!username && isValidUsername) {
      setUsernameError('Username is required!');
    }
    else if (!password) {
      setPasswordError('Password is required!');
    }
    else if (username && password) {
      const res = await doLogin(username, password);
      console.log(res);
    }
  };


  const doLogin = async (e) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/login',
        {
          username, password
        },

        {
          withCredentials: true
        });

      if (response.data == username) {
        sessionStorage.setItem('username', response.data);
        sessionStorage.getItem(document.cookie)
        console.log(document.cookie);
        
        router.push('../civilian/profile');
      }  else {
          setError('Username or password is incorrect');
        }
      
    } catch (error) {
      setError('An error occurred during login.');
    }
  };



  return (
    <>
      <SessionCheck />

      <div class="flex flex-wrap justify-center items-center h-screen bg-gray-100">
        
          
          <div className="w-full sm:w-1/2 p-10">
            <img src="/login.png" alt="login image" className="mx-auto max-w-sm"/>
          </div>
          <div className="w-20 sm:w-1/2 p-20">

          <form class="mt-4 items-center  p-10 bg-white mx-auto shadow-lg rounded-lg" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold"><center>Welcome Back</center></h1>
            <h1 className="text-gray-500 text-sm"><center>Please enter your username and password to login</center></h1>
            <div class="mb-6">
              <label for="username" class="block mb-2 text-sm font-medium">Username</label>
              <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              {usernameError && <p className="text-center font-bold text-red-500">{usernameError}</p>}
            </div>
            <div class="mb-6">
              <label for="password" class="block mb-2 text-sm font-medium">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              {passwordError && <p className="text-center font-bold text-red-500">{passwordError}</p>}
            </div>

            <div>
              {error && <p class="text-center font-bold text-red-500">{error}</p>}
              <br></br>
            </div>

            <center>
              <button type="submit" class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
              <br></br><br></br>
              <Link href="../civilian/signup" class="font-medium text-blue-400 dark:text-blue-500 hover:underline">Not Registered?</Link>
            </center>
          </form>
        </div>
        </div>
      
    </>
  );
};

export default LoginForm;