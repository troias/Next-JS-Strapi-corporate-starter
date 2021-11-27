import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Image from "next/image";
import Slider from "../ui/slider/slider";

export const formatImgUrl = (url) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + url;
};

const FeaturedLocationGroup = ({ data }) => {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API,
  });
  const [map, setMap] = useState(null);
  const refs = useRef([]);
  const addToRefs = (map) => {
    if (map && !refs.current.includes(map)) {
      refs.current.push(map);
    }
  };
  const futureLocationsMapLoadHandler = async (data) => {
    const location = data.map(async (location) => {
      location.address = location.address.replace(/\s/g, "+");
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`;
      const response = await fetch(url);
      const data = await response.json();

      return {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      };
    });
    const locations = await Promise.all(location);
    await loader
      .load()
      .then((google) => {
        const setMapLocations = (locations, refs) => {
          //arr of locations
          const passRefsToMap = locations.map((location, index) => {
            const map = new google.maps.Map(refs.current[index], {
              center: location,
              zoom: 15,
            });
            const marker = new google.maps.Marker({
              position: location,
              map: map,
            });
            return map;
          });
        };
        setMapLocations(locations, refs);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    if (!map) {
      futureLocationsMapLoadHandler(data.locations);
    }
  }, [map]);

  const FutureLocations = () => {
    return (
      <div>
        {data.locations.map((location, index) => {
          const removeChar = (x) => x.address.replace(/\+/g, " ");
          const formattedAddress = removeChar(location);
          return (
            <div
              key={index}
              className="flex-col justify-between m-1 p-1 border-black border rounded-2xl shadow-md"
            >
              <div className="flex flex-wrap justify-around ">
                <div className="flex-col w-auto">
                  <div className="flex space-between flex-col ">
                    {location.name && (
                      <div>
                        <h1 className="font-bold mb-1 mt-2  ml-3">Location</h1>
                        <h3 className="text-lg  ml-3">{location.name}</h3>
                      </div>
                    )}
                  </div>
                  <div className="flex space-between flex-col">
                    {location.address && (
                      <div>
                        <h1 className="font-bold mb-1 mt-2  ml-3">Address</h1>
                        <h3 className="text-lg  ml-3">{formattedAddress}</h3>
                      </div>
                    )}
                  </div>
                  <div className="flex space-between flex-col">
                    {location.date && (
                      <div>
                        <h1 className="font-bold mb-1 mt-2  ml-3">Date</h1>
                        <h3 className="text-lg  ml-3">{location.date}</h3>
                      </div>
                    )}
                  </div>
                  <div className="flex space-between flex-col ">
                    {location.hours && (
                      <div>
                        <h1 className="font-bold mb-1 mt-2  ml-3">Hours</h1>
                        <h3 className="text-lg  ml-3">{location.hours}</h3>
                      </div>
                    )}
                  </div>
                  <div className="flex space-between flex-col">
                    {location.content && (
                      <div>
                        <h1 className="font-bold mb-1 mt-2  ml-3">
                          Description
                        </h1>
                        <h3 className="text-lg  ml-3">{location.content}</h3>
                      </div>
                    )}
                  </div>
                  <div className="flex space-between flex-col">
                    {location.website && (
                      <div>
                        <h1 className="font-bold mb-1 mt-2  ml-3">Website</h1>
                        <h3 className="text-lg ml-3">{location.website}</h3>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center w-4/5 mb-2 mt-2">
                  {location.images && <Slider images={location.images} />}
                </div>
              </div>

              <div
                ref={addToRefs}
                id="map"
                style={{
                  height: "50vh",
                  className: "map-container",
                  width: "97vw",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>  
        <h1 className="
        text-center  text-2xl font-bold mb-5 mt-5  ml-3     ">
    {data.mainTitle}</h1>
      <FutureLocations />
    </>
  );
};

export default FeaturedLocationGroup;
