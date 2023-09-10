import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./Layout/header'),{
  ssr: false,
})

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function SignIn() {
  return (
    <>
    <Title page="Fogot Password"></Title>
    <Header></Header>
    <h1>Find your account</h1> 
        <form>
            <p>Please enter your email address to find your account.</p>
            <label>Email </label>
            <input type="email" name="email" placeholder='Enter your email'></input><br /><br />
            
            <input type="submit" name="submit" value="Confirm"  />
            <h><Link href="signin">Login</Link></h>

        </form>
        <br />
        
    
    </>
  );
}
