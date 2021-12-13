// import Head from 'next/head';

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../elements/loader";

const FeaturedSocialMediaGroup = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState();

  const sectionData = {
    ...data,
    images: posts,
  };

  useEffect(() => {
    const getInstaPosts = async () => {
      let post;
      let error;

      try {
        setLoading(true);
        const server = `${process.env.NEXT_PUBLIC_API}`;
        const req = await fetch(`${server}/api/social-media-api`);
        // await req
        const res = await req.json();
        if (!req.ok) {
          error = res.message;
        }
        post = res.posts;
        if (!post) {
          // error = "post is null"
          post = [];
        }

        setLoading(false);
      } catch (error) {
        error = error;
      }
      setError(error);
      setPosts(post);
    };
    getInstaPosts();
  }, []);

  return (
    <div className="container flex-col">
      <div className="flex justify-center mt-10 font-bold text-lg ">
        <h1>{data.mainTitle}</h1>
      </div>
      <div>
        {errors && (
          <h1 className="flex justify-center mt- font-bold text-lg mb-5">
            {" "}
            {errors}
          </h1>
        )}

        <ul className=" flex flex-wrap justify-center ">
          {loading && (
            <div className="mt-5 mb-5 ">
              <Loader />{" "}
            </div>
          )}
          {!loading &&
            sectionData.images.length > 0 &&
            sectionData.images.map(({ node }, i) => {
              return (
                <li key={i} className="w-96 mb-10 mt-5 mr-5">
                  <Image
                    src={node.display_resources[0].src}
                    alt={node.accessibility_caption}
                    width={node.display_resources[0].config_width}
                    height={node.display_resources[0].config_height}
                  />
                  <p className="mt-10 font-bold">
                    {node.edge_media_to_caption.edges[0]?.node.text}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedSocialMediaGroup;
