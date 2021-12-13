import Instagram from "instagram-web-api";



const handler = async (req, res) => {

  if (req.method === "GET") {

    try {
      const client = new Instagram({
        username: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME,
        password: process.env.NEXT_PUBLIC_INSTAGRAM_PASSWORD,
      });

     

      try {
        await client.login();
      } catch (error) {
        res.status(401).json({
          message: "Failed to login because API refused Login",
        });
        return
      }

      try {
        const response = await client.getPhotosByUsername({
          username: "little_cherry_coffee",
          first: 6,
        });
       

        

        res.status(200).json({
          posts: response.user.edge_owner_to_timeline_media.edges,
        });
      } catch (error) {
        res.status(404).json({
          message: "No posts found",
        });
        
      }
    } catch (error) {
          console.log(error || "error")
          res.status(500).json({
              message: "API route issue"
          })
          return
    }
  }
};
export default handler;
