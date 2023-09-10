import Image from 'next/image'
import Link from 'next/link'

import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('./Layout/layout'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function SendEmailToProvider() {
  return (
    <>
    <Title page="Email Civilian"></Title>
    <Layout>
    <h1>Send Email to Civilian</h1> 
    <form>

    <label for="recipient">Recipient Email:</label>
    <input type="email" id="recipient" name="recipient" required/><br></br><br></br>

    <label for="subject">Subject:</label>
    <input type="text" id="subject" name="subject" required/><br></br><br></br>

    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
       
 
    
  </form>


        </Layout>   
    
    </>
  );
}
