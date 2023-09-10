import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicProviderReg = dynamic(() => import('../component/addProviderForm'));

const AddProvider = () => {
    return (
        <>
      
            <Title page ="Add Provider"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicProviderReg />
                </div>
                
              </Layout> 
             
        </>
    );
};

export default AddProvider;