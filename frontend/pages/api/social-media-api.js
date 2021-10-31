import Instagram from 'instagram-web-api'


const handler = async (req, res) => {

    // if (process.env.INSTAGRAM_ACCESS_TOKEN) {
    //     const instagram = new Instagram()
    //     instagram.setAccessToken(process.env.INSTAGRAM_ACCESS_TOKEN)
    //     const { data } = await instagram.getSelfRecentMedia()
    //     return data
    // }


    if (req.method === "GET") {

        const client = new Instagram({
            username: process.env.NEXT_PUBLIC_INSTAGRAM_EMAIL,
            password: process.env.NEXT_PUBLIC_INSTAGRAM_PASSWORD
        })
        await client.login();

        const response = await client.getPhotosByUsername({
            username: 'INSTAGRAM_USERNAME',
        });

        console.log("client", client)
        console.log("response", response)
        res.json(response)
        // try {



        //     const client = new Instagram({
        //         username: process.env.NEXT_PUBLIC_INSTAGRAM_EMAIL,
        //         password: process.env.NEXT_PUBLIC_INSTAGRAM_PASSWORD
        //     })



        //     try {
        //         const result = await client.login()
        //         if (!result.ok) {
        //             throw new Error('Failed to login')
        //         }
        //     } catch (error) {
        //         res.status(500).json({
        //             message: 'Failed to login',
        //             error: error
        //         })

        //         console.log("error", error)

        //     }


        // try {
        //     const response = await result.getPhotosByUsername({
        //         username: "unicorn",
        //         first: 1
        //     });
        //     console.log("socialPostApiResponse", response);

        // } catch (error) {
        //     res.status(404).json({
        //         message: "No posts found"
        //     })
        //     throw new Error('Failed to getPhotosByUsername' || error);
        // }


        // posts = response.user.edge_owner_to_timeline_media.edges



        // console.log("socialPostApi", posts);

        //     if (!posts) {
        //         post = []

        //     }

        //     res.status(200).json({
        //         posts: posts
        //     })

        // } catch (error) {
        //     console.log(error || "error")
        //     res.status(500).json({
        //         message: "API route issue"
        //     })


        // }




    }




}
export default handler