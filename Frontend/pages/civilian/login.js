import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";


const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  })
const DynamicLoginProfile = dynamic(() => import('../component/loginForm'));

const CivilianLogin = () => {
    return (
        <>
            <Title page="login" />
                <SessionCheck />
                <div>
                    <DynamicLoginProfile />
                </div>
        </>
    )
};

export default CivilianLogin;