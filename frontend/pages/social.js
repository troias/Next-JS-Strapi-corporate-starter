
import Image from 'next/image'
import Head from 'next/head'

const Social = ({ posts, errors }) => {

    if (!posts) {
        return <div>No posts...</div>
    }
    // console.log("FeaturedSocialMediaGroup", data)
    console.log("FeaturedSocialProps", posts)
    console.log("FeaturedSocialerrors", errors)
    return (
        <div className="container flex-col">
            <Head>
                <title>Instagram Posts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className="flex justify-center mt-10 font-bold text-lg">
                <h1>Social Media</h1>

            </div>
            {errors && <h1>  {errors}</h1>}
            <div className=" w-10 h-10">
                <ul className=" w-10 h-10">

                    {/* <NextImage media={ } /> */}
                    {posts.map(({ node }, i) => {
                        { console.log("node.display_resources[0].src", node.display_resources[0].src) }

                        const externaImageLoader = ({ src }) =>
                            `instagram.fakl1-2.fna.fbcdn.net"/${src}`;

                        return (
                            <li key={i} className="">
                                <Image
                                    loader={externaImageLoader}
                                    src={node.display_resources[0].src}
                                    alt={node.accessibility_caption}
                                    width={500}
                                    height={500}


                                />
                                {/* <Image src={node.display_resources[0].src} />  */}

                                {/* <img className="" src={node.display_resources[0].src} /> */}
                                {/* <p>{node.edge_media_to_caption.edges[0]?.node.text}</p> */}
                            </li>

                        );
                    })}

                </ul>

            </div>
        </div>
    )
}

export const getStaticProps = async () => {


    let post
    let error = null

    try {


        const server = 'http://localhost:3000'
        const req = await fetch(`${server}/api/social-media-api`)
        // await req 
        console.log("req", req)
        const res = await req.json()

        console.log("responsePostsJSONFrontEnd", res)

        if (!req.ok) {
            console.log("requestFailed")
            error = res.message

        }

        post = res.posts

        if (!post) {
            console.log("post is null")
            // error = "post is null"
            post = []
        }

        console.log("socialPagePosts", post)




    } catch (error) {
        console.log(error)
        error = error

    }


    return {
        props: {
            posts: post,
            errors: error,
        }
    };




}

export default Social