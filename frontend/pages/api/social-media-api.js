import Instagram from "instagram-web-api";

const handler = async (req, res) => {
  // if (process.env.INSTAGRAM_ACCESS_TOKEN) {
  //     const instagram = new Instagram()
  //     instagram.setAccessToken(process.env.INSTAGRAM_ACCESS_TOKEN)
  //     const { data } = await instagram.getSelfRecentMedia()
  //     return data
  // }

  if (req.method === "GET") {
    // const client = new Instagram({
    //     username: process.env.NEXT_PUBLIC_INSTAGRAM_EMAIL,
    //     password: process.env.NEXT_PUBLIC_INSTAGRAM_PASSWORD
    // })
    // await client.login();

    // const response = await client.getPhotosByUsername({
    //     username: 'INSTAGRAM_USERNAME',
    // });

    // console.log("response", response)
    // res.json(response)

    try {
      const client = new Instagram({
        username: process.env.NEXT_PUBLIC_INSTAGRAM_EMAIL,
        password: process.env.NEXT_PUBLIC_INSTAGRAM_PASSWORD,
      });

      console.log("client", client);

      try {
        await client.login();
      } catch (error) {
        res.status(500).json({
          message: "Failed to login",
        });
      }

      try {
        const response = await client.getPhotosByUsername({
          username: "troy_flavell_nz",
          first: 6,
        });
        console.log("socialPostApiResponse", response);

        // console.log("socialPostApi", posts);

        res.status(200).json({
          posts: response.user.edge_owner_to_timeline_media.edges,
        });
      } catch (error) {
        res.status(404).json({
          message: "No posts found",
        });
        throw new Error("Failed to getPhotosByUsername" || error);
      }
    } catch (error) {
      //     console.log(error || "error")
      //     res.status(500).json({
      //         message: "API route issue"
      //     })
    }
  }
};
export default handler;
