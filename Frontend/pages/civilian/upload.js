import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";

const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });
  const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
const DynamicUpload = dynamic(() => import('../component/uploadFile'));

const uploadFile = () => {
    return (
        <> 
            <Title page="Profile" /> 
            <Layout> 
                <SessionCheck />
                <div>
                    <DynamicUpload />
                </div>
                </Layout> 
        </>
    )
};

export default uploadFile;