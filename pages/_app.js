import "../styles/index.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700;800&display=swap" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <link rel="icon" href="/img/fare.ico" />
            </Head>
            <div className="dark">
                <Component {...pageProps} />
            </div>
        </>
    );
}
export default MyApp;
