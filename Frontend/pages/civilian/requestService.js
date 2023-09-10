import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";

const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });
  const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
const DynamicCivilianProfile = dynamic(() => import('../component/reqServiceForm'));

const RequestService = () => {
    return (
        <> 
            <Title page="Request Service" /> 
            <Layout>
                <SessionCheck />
                <div>
                    <DynamicCivilianProfile />
                </div>
                </Layout>  
        </>
    )
};

export default RequestService;