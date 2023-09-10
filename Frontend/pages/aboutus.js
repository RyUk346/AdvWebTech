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
    <Title page="about us"></Title>
    
    <Layout className="flex justify-center items-center h-screen"/>
    <div className="text-center mb-4 text-2xl font-bold text-black">About us</div>
    
    
   
     <div className="text-center"></div><h1>Emergency helpline management system is an alternative, even a befitting solution to national helpline-999. Civilians can get different services from one platform. For example, if you need an ambulance at night but can not get services from your contacts, you can book an ambulance by the application. Another scenario is- imagine you are in a crime scene where you can not make a phone call. Moreover, if the government launches a development program for unprivileged women, women can find it here and so many services. The most crucial factor is that providers can easily follow up with the civilians about their updates.
Civilians can easily register and log in to get the services. They can get health-related services such as booking an appointment with the doctor, ordering medicines, booking an ambulance, and so on. They can pay from the app without facing different issues if they order medicines or book appointments. They also can see these requests’ history. They can use search in different service histories. They also can contact their provider via email.
Women Service Provider can also seamlessly register and log in to provide women-related services to the civilian. They can do registration for the civilians who can’t do it on their own. If they provide any service to the civilian, their office location will be automatically sent to the civilian, which is done by Google’s Geolocation. If any civilian needs to come to the office, they can simply use the map. They can follow up with the civilian by email. They can remove civilians. Also, they can see service histories. Also, a timer will start when they login to their system. It will stop when they logout of the system. This way, the administration can easily check how long they work in the office.
Health Service Provider is a comprehensive part of the web application designed to enhance healthcare accessibility. The admin panel facilitates secure registration, login, and logout functionalities alongside efficient client management through profile search, updates, and recovery options. Clients can conveniently access the platform for general health queries, browse doctor profiles for informed decisions, and retrieve essential ambulance details. This project bridges the gap between healthcare seekers and providers, streamlining interactions and information dissemination for optimized healthcare delivery.</h1>
    
    <br></br>

    
    
    </>
  );
}
