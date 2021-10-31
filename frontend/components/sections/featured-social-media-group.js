// import Head from 'next/head';
import NextImage from '../elements/image'


const FeaturedSocialMediaGroup = ({ data, props }) => {

    // console.log("FeaturedSocialMediaGroup", data)
    // console.log("FeaturedSocialProps", props)
    return (
        <div className="container flex-col">
            {/* <Head>
                <title>Instagram Posts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            <div className="flex justify-center mt-10 font-bold text-lg">
                {/* <h1>{data.mainTitle}</h1> */}
            </div>
            <div>
                <h1>Instagram Posts</h1>
                <ul className="list-none">
                    <li className="mb-4 border-b pb-b" >
                        {/* <NextImage media={ } /> */}
                    </li>
                </ul>

            </div>
        </div>
    )
}

export const getStaticProps = async () => {

    // const server = 'http://localhost:3000'
    // const req = await fetch(`${server}/api/social-media-api`)
    // const res = await req.json()
    // console.log("instagram-posts", res)

    return {
        props: {
            data: {
                posts: []
            }
        }
    }
}

export default FeaturedSocialMediaGroup
