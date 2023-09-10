import Header from './header';
import Title from './title';
import Link from 'next/link';
import NavBar from './navbar';
import Sidebar from './sideBar';
import Footer from './footer';


export default function Layout (
    {children}
){
    return (
        <>
        
        <Header></Header>
      <NavBar />
    
       {/* <h3> <button><Link href="/">Home</Link></button></h3>
        <h3> <button><Link href="profile">Profile</Link></button></h3>
        <h3> <button><Link href="payment">Payment </Link></button></h3>
        <h3> <button><Link href="serviceRequest">Request Service </Link></button></h3>
        <h3> <button><Link href="signin">Logout </Link></button></h3>*/}
        {children}
        <br></br>
  
          <Footer/>
        
        </>
    )
}