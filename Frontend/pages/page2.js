import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function Page2() {
  return (
    <>
    <Title page="Welcome"></Title>
    <Layout>
    <h1>Welcome to Page 2</h1> 
    <br></br> 
    <button>{'\n'}<h1> {'\n'}<Link href="/">Home</Link></h1></button>
    </Layout>
    </>
  );
}
