
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getGlobalData, getPageData } from 'utils/api'


const Social = ({ posts, errors, pageContext, global }) => {


    // if (!posts) {
    //     return <div>No posts...</div>
    // }
    // console.log("FeaturedSocialMediaGroup", data)
    // console.log("FeaturedSocialProps", posts)
    // console.log("FeaturedSocialerrors", errors)

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
            <div className="flex-col ">
                <div className="flex justify-center mt-10 ">
                    <h1 className="font-bold"> Instagram Posts</h1>

                </div>
                <ul className=" flex flex-wrap justify-center ">

                    {posts.map(({ node }, i) => {
                        return (
                            <li key={i} className="w-96 mb-10 mt-10 mr-5">
                                <Image

                                    src={node.display_resources[0].src}
                                    alt={node.accessibility_caption}
                                    width={node.display_resources[0].config_width}
                                    height={node.display_resources[0].config_height}


                                />
                                <p className="mt-10 font-bold">{node.edge_media_to_caption.edges[0]?.node.text}</p>
                            </li>
                        );
                    })}
                </ul>
            </div> 
        </div>
  
    )
}




export const getStaticProps = async (context) => {

    
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