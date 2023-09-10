import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";

const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });

const DynamicSendMailForm = dynamic(() => import('../component/sendMailForm'));

const SendMailPage = () => {
    return (
        <>
            <SessionCheck />

            
            <Title page ="Send Mail"></Title>
            <Layout>

            <div>
                <DynamicSendMailForm />
            </div>
            </Layout>
        </>
    )
};

export default SendMailPage;