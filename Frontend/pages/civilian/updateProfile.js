import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";

const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });
  const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
const DynamicUpdateProfile = dynamic(() => import('../component/updateProfileForm'));

const UpdateProfile = () => {
    return (
        <> 
            <Title page="Profile" />  
            <Layout>
                <SessionCheck />
                <div>
                    <DynamicUpdateProfile />
                </div>
                </Layout> 
        </>
    )
};

export default UpdateProfile;