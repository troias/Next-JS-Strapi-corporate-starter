// import Head from 'next/head';

import Image from "next/image"
import { useEffect, useState } from 'react'
import Loader from '../elements/loader'

const FeaturedSocialMediaGroup = ({ data }) => {

    console.log("FeaturedSocialMediaGroup", data)

    // console.log("FeaturedSocialProps", props)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setError] = useState()


    const sectionData = {
        ...data, 
        images: posts,
    }
    
    console.log("instagramPosts", posts)
    console.log("updatedStrapidata", sectionData)

    useEffect(() => {

        const getInstaPosts = async () => {
            let post
            let error

            try {
                setLoading(true)
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
                setLoading(false)



            } catch (error) {
                console.log(error)
                error = error
                
            }
            setError(error)
            setPosts(post)
        }
        getInstaPosts()
    }, [])

    return (
        <div className="container flex-col">
            <div className="flex justify-center mt-10 font-bold text-lg ">
                <h1>{data.mainTitle}</h1>
            </div>
            <div>
             
                {errors && <h1 className="flex justify-center mt- font-bold text-lg mb-5">  {errors}</h1>}
        
          
                <ul className=" flex flex-wrap justify-center ">
                        {loading && <div className="mt-5 mb-5 "><Loader /> </div>}
                        {!loading && sectionData.images.length > 1 && sectionData.images.map(({ node }, i) => {
                            return (
                                <li key={i} className="w-96 mb-10 mt-5 mr-5">
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



export default FeaturedSocialMediaGroup
