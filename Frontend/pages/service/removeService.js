import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";

const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });
  const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
const DynamicRemoveService = dynamic(() => import('../component/removeServiceForm'));

const RemoveService = () => {
    return (
        <> 
            <Title page="Remove Service" />  
            <Layout>
                <SessionCheck />
                <div>
                    <DynamicRemoveService />
                </div>
                </Layout> 
        </>
    )
};

export default RemoveService;