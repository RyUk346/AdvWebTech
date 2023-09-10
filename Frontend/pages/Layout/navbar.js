import Link from "next/link";
import ThemeButton from "../utils/ThemeButton";
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import axios from "axios";

export default function NavBar(props){

  const [mounted,setMounted] = useState(false)
  useEffect(() =>setMounted(true),[])


  const router = useRouter();
  const [username, setUsername] = useState(null);

  async function Logout() {
    try {

        const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/logout',

            null,
            {
                withCredentials: true, 
            }
        );

        if (response.status === 201) {
            sessionStorage.removeItem('username');
            setUsername(null);
            document.cookie = ''; 
            router.push('../civilian/login');
        } else {
            console.error('Sign-out failed:', response);
        }
    } catch (error) {
        console.error('Sign-out error:', error);
    }
}
    return(
            
            <div className="navbar bg-blue-300 shadow-[0_0_8px_purple]">
  <div className="flex-1 space-x-2">
  <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content bg-blue-300">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate"><svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay bg-slate-50"></label>
    <ul className="menu w-60 min-h-full bg-blue-300 text-base-content"style={{ marginTop: '90px' }}>
      {/* Sidebar content here */}
<center>
      <Link href="/"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500 w-40" ><button>Home</button></a></Link><br/><br/>
  <Link href="../civilian/profile"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500 w-40"><button>Profile</button></a></Link><br/><br/>
  <Link href="../civilian/payment"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500 w-40"><button>Payment </button></a></Link><br/><br/>
  <Link href="../civilian/requestService"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500 w-40"><button>Request Service </button></a></Link><br/><br/>
  <Link href="../service/services"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500 w-40" ><button>Services</button></a></Link><br/><br/>
  <Link href="../civilian/searchProvider"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500 w-40"><button>Search </button></a></Link><br/><br/>
      
      </center>
      <center>
      <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn  btn-outline rounded-full glass hover:bg-blue-500 w-40"><button className="text-lg">History</button></label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-50">
    <li><Link legacyBehavior href="../service/services"><a className="link link-info">service History</a></Link></li>
    <li><Link legacyBehavior href="../civilian/emailHistory"><a className="link link-info">Email History</a></Link></li>

  </ul>
</div>  </center>
    </ul>
  </div>
</div>
<center>
<div className="text-center text-2xl mb-4 font-bold text-white"><center></center>
<div className="whitespace-nowrap">Emergency helpline Management System</div>
    
  
  </div>
  </center>
 
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        <img src={process.env.NEXT_PUBLIC_API_BASE_URL+ `/photo?${Date.now()}`}  />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
          <button><Link href="../civilian/profile">Profile</Link></button>
            <span className="badge">New</span>
          </a>
        </li>
        <li><Link href="../civilian/upload"><button>Upload Profile Picture</button></Link></li>
        <li><button onClick={Logout}>Logout </button></li>
      </ul>
    </div>
  
  
  {mounted &&<ThemeButton />}
  

</div>
</div>
    )

}