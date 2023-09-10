import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";

const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });
const DynamicCivilianProfile = dynamic(() => import('../component/profileForm'));

const CivilianProfile = () => {
    return (
        <> 
            <Title page="Profile" />   
                <SessionCheck />
                <div>
                    <DynamicCivilianProfile />
                </div>
        </>
    )
};

export default CivilianProfile;