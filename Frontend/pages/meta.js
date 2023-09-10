import Head from "next/head";
import React from "react";


const Meta = ({title,keywords, description}) => {
    return(
        <React.Fragment>
            <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initail-scale=1"/>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            </Head>
        </React.Fragment>
    );
}

Meta.defaultProps = {
    title: "Travel Vlogger",
    keywords: "travel, vlog",
    description: "This is travel vloger Page"
}
export default Meta