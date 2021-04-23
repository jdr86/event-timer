import Layout from "../components/layout";
import MainComponent from "../components/homepage/index";
import Head from "next/head";
const Templates = () => {
    return (
        <Layout>
            <Head>
                <title>Fare estimator</title>
                <meta name="title" content="Fare estimate" />
                <meta name="description" content="Estimate the fare" />
                <meta name="keywords" content="" />
            </Head>
            <MainComponent />
        </Layout>
    );
};
export default Templates;
