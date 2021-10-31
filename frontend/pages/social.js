
import Image from 'next/image'

const Social = ({ posts, errors }) => {


    // console.log("FeaturedSocialMediaGroup", data)
    console.log("FeaturedSocialProps", posts)
    console.log("FeaturedSocialerrors", errors)
    return (
        <div className="container flex-col">
            {/* <Head>
                <title>Instagram Posts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            <h1>  {errors}</h1>
          
            <div className="flex justify-center mt-10 font-bold text-lg">
                {/* <h1>{data.mainTitle}</h1> */}
            </div>
            <div>
                <ul className="list-none">
                    <li className="mb-4 border-b pb-b" >
                        {/* <NextImage media={ } /> */}
                        {/* {posts.map(({ node }, i) => { */}
                        {/* return (
                                <li key={i}> */}
                        {/* <Image src={node.display_resources[0].src} /> */}
                        {/* <img src={node.display_resources[0].src} /> */}
                        {/* <p>{node.edge_media_to_caption.edges[0]?.node.text}</p> */}
                        {/* </li>
                            );
                        })} */}
                    </li>
                </ul>

            </div>
        </div>
    )
}

export const getStaticProps = async () => {


    // let post = []
    // let error
    try {
        const server = 'http://localhost:3000'
        const req = await fetch(`${server}/api/social-media-api`)
        const res = await req.json()

        console.log("response", res)

        if (!req.ok) {
            console.log("requestFailed")
            // error = res.message
            throw new Error('Failed to load data.')
        }
        // } else {
        //     post = res.posts
        // }



        // console.log("socialPagePosts", post)

        // if (!post) {
        //     throw new Error('Failed to load data.')
        // }



    } catch (error) {
        // console.log(error)
        // error = error.message

    }

    return {
        props: {
            // posts: post
            // errors: error,
        }
    };




}

export default Social