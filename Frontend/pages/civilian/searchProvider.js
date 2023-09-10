import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicSearchProvider = dynamic(() => import('../component/searchProviderForm'));

const SearchProvider = () => {
    return (
        <>
      
            <Title page ="Search"></Title>
            <Layout>
                <SessionCheck />
                <div>
                    <DynamicSearchProvider/>
                </div>          
              </Layout>           
        </>
    );
};

export default SearchProvider;

