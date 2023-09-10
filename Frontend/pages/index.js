import Link from 'next/link'

import dynamic from 'next/dynamic';
import Sidebar from './Layout/sideBar';

const Layout = dynamic(() => import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function Home() {
  return (
    <>
    <Title page="Home"></Title>
    
    <Layout className="flex justify-center items-center h-screen"/>
    <div className="text-center mb-4 text-2xl font-bold text-black">Welcome</div>
    
    <center>
   
     <div className="text-center"></div><h1>Emergency helpline management system is to help you at your emergency situation </h1>
     </center><br/> <br/>
    <br></br>
    <center>
   
     <div className="text-center"></div><h1>Create account to make request for service  </h1>
     <Link href="../civilian/signup" class="font-medium text-blue-400 dark:text-blue-500 hover:underline">Create account to make request for service  </Link><br/> <br/>
     <Link href="../civilian/login" class="font-medium text-green-500 dark:text-blue-500 hover:underline pb-40">Login if Already Registered.</Link>
     </center><br/> <br/>
    <br></br>

    
    
    </>
  );
}
