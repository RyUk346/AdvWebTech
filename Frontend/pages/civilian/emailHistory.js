import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicEmailHistory = dynamic(() => import('../component/emailHistoryForm'));

const EmailHistory = () => {
    return (
        <>
      
            <Title page ="Emails"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicEmailHistory/>
                </div>
                
              </Layout> 
             
        </>
    );
};

export default EmailHistory;

