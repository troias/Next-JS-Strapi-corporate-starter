import Head from 'next/head'
import Instagram from 'instagram-web-api'

 const FeaturedSocialMediaGroup = ({data, props}) => {

    console.log("FeaturedSocialMediaGroup", data)
    console.log("FeaturedSocialProps", props)
    return (
        <div className="container flex-col">
                <Head>
                <title>Instagram Posts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-center mt-10 font-bold text-lg">
                <h1>{data.mainTitle}</h1>
            </div>
            <div>
                <h1>Instagram Posts</h1>
            </div>
        </div>
    )
}

export const getStaticProps = async () => {

    const client = new Instagram({ username: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME, password: process.env.NEXT_PUBLIC_INSTAGRAM_PASSWORD});
    await client.login();
    const posts = await client.getPosts();
    
    

    return {
        props: {
            data: {
                posts: posts
            }
        }
    }
}

export default FeaturedSocialMediaGroup
