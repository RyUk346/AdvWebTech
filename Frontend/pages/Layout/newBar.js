import Link from "next/link";
import ThemeButton from "../utils/ThemeButton";
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import axios from "axios";
import React, { useState } from 'react';
import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
} from 'react-icons/md';
import {
  BsChevronDown,
  BsChatLeftText,
  BsCalendarCheck,
  BsFiles,
  BsServer,
} from 'react-icons/bs'; 
const Menus = [
  { title: 'Dashboard', src: 'Chart_fill', icon: <MdOutlineDashboard /> },
  { title: 'Inbox', src: 'Chat', icon: <BsChatLeftText /> },
  { title: 'Accounts', src: 'User', gap: true, icon: <MdAccountCircle /> },
  {
    title: 'Schedule ',
    src: 'Calendar',
    icon: <BsCalendarCheck />
    , subMenus: [
      {
        title: 'Service 1',
        src: '/services/services1',

        cName: 'sub-nav',
      },
      {
        title: 'Service 2',
        src: '/services/services2',

        cName: 'sub-nav',
      },
      {
        title: 'Service 3',
        src: '/services/services3',
      },
    ],
    isOpen: false
  },
  {
    title: 'Services',
    src: 'Services',
    icon: <BsServer />,
    subMenus: [
      {
        title: 'Service 1',
        src: '/services/services1',

        cName: 'sub-nav',
      },
      {
        title: 'Service 2',
        src: '/services/services2',

        cName: 'sub-nav',
      },
      {
        title: 'Service 3',
        src: '/services/services3',
      },
    ],
    isOpen: false
  },
  { title: 'Analytics', src: 'Chart', icon: <MdAnalytics /> },
  { title: 'Files ', src: 'Folder', gap: true, icon: <BsFiles /> },
  { title: 'Setting', src: 'Setting', icon: <MdOutlineSettings /> },
  { title: 'Logout', src: 'Logout', icon: <MdLogout /> },
];


export default function NavBar(props){

  const [mounted,setMounted] = useState(false)
  useEffect(() =>setMounted(true),[])


  const router = useRouter();
  const [username, setUsername] = useState(null);

  const Menus = [
    { title: 'Dashboard', src: 'Chart_fill', icon: <MdOutlineDashboard /> },
    { title: 'Inbox', src: 'Chat', icon: <BsChatLeftText /> },
    { title: 'Accounts', src: 'User', gap: true, icon: <MdAccountCircle /> },
    {
      title: 'Schedule ',
      src: 'Calendar',
      icon: <BsCalendarCheck />
      , subMenus: [
        {
          title: 'Service 1',
          src: '/services/services1',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 2',
          src: '/services/services2',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 3',
          src: '/services/services3',
        },
      ],
      isOpen: false
    },
    {
      title: 'Services',
      src: 'Services',
      icon: <BsServer />,
      subMenus: [
        {
          title: 'Service 1',
          src: '/services/services1',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 2',
          src: '/services/services2',
  
          cName: 'sub-nav',
        },
        {
          title: 'Service 3',
          src: '/services/services3',
        },
      ],
      isOpen: false
    },
    { title: 'Analytics', src: 'Chart', icon: <MdAnalytics /> },
    { title: 'Files ', src: 'Folder', gap: true, icon: <BsFiles /> },
    { title: 'Setting', src: 'Setting', icon: <MdOutlineSettings /> },
    { title: 'Logout', src: 'Logout', icon: <MdLogout /> },
  ];
  
  const Sidebar = () => {
    const [Menu, SetMenu] = useState(Menus);
    const [open, setOpen] = useState(true);
  
    const setSubMenuOpen = (index) => {
      SetMenu((prevMenus) =>
        prevMenus.map((menu, i) => {
          if (i === index) {
            return { ...menu, isOpen: !menu.isOpen };
          }
          return menu;
        })
      );
    };
  
    const toggleSidebar = () => {
      setOpen(!open);
    };

  async function Logout() {
    try {

        const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/logout',

            null,
            {
                withCredentials: true, // Send cookies along with the request
            }
        );

        if (response.status === 201) {
            sessionStorage.removeItem('username');
            setUsername(null);
            document.cookie = ''; // Clear cookies
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
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate"><svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu w-60 min-h-full bg-base-200 text-base-content"style={{ marginTop: '82px' }}>
      {/* Sidebar content here */}

      <Link legacyBehavior href="../provider/home"><a className="btn btn-outline normal-case text-xl"><button>Home</button></a></Link>
      <br/> 
      <Link legacyBehavior href="../provider/provideService"><a className="btn btn-outline normal-case text-xl"><button>Provide Service</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/addCivilian"><a className="btn btn-outline normal-case text-xl"><button>Register Civilian</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/removeCivilian"><a className="btn btn-outline normal-case text-xl"><button>Delete Civilian</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/searchCivilian"><a className="btn btn-outline normal-case text-xl"><button>Search</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/sendMail"><a className="btn btn-outline normal-case text-xl"><button>Email Civilian</button></a></Link>
      <br/>
      <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-outline normal-case text-xl btn-block"><button className="text-lg">History</button></label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-50">
    <li><Link legacyBehavior href="../provider/serviceHistory"><a className="link link-info">ALL Services</a></Link></li>
    <li><Link legacyBehavior href="../provider/civilianHistory"><a className="link link-info">Registered Civilian</a></Link></li>
    <li><Link legacyBehavior href="../provider/emailHistory"><a className="link link-info">Email History</a></Link></li>
  </ul>
</div>  
    </ul>
  </div>
</div>


    
  <Link href="/"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500" ><button>Home</button></a></Link>
  <Link href="../civilian/profile"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500"><button>Profile</button></a></Link>
  <Link href="../civilian/payment"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500"><button>Payment </button></a></Link>
  <Link href="../civilian/requestService"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500"><button>Request Service </button></a></Link>
  <Link href="../service/services"> <a className="btn  btn-outline rounded-full glass hover:bg-blue-500" ><button>Services</button></a></Link>
    
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
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
  </div>
  
  {mounted &&<ThemeButton />}
  

</div>
    )

}