
import React, { useEffect, useState, useRef } from 'react'

import { Loader } from '@googlemaps/js-api-loader';



const FeaturedLocationGroup = ({ data }) => {

    const mapRef = useRef()
    // const mapRef1 = useRef()
    // const mapRef2 = useState()

    const [map, setMap] = useState(null)

    const initMap = async (data) => {

        const uluru = { lat: -25.344, lng: 131.036 };
  
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: uluru
                });



    
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API,
            version: "weekly",
            libraries: ["maps"]
        });

        await loader.load().then((google) => {
            setMap(map)
            const marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }).catch(e => {
                // do something
                console.log("error", e)
            });
    }
    useEffect(() => {
        initMap()

    }, [])


    console.log("map", map)

    const url = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&q=Space+Needle,Seattle+WA`
    return (
        <>
            <div ref={mapRef} id="map" className="">
                {map && <iframe title="map" src={url} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe> }

            </div>


        </>

    )
}



export default FeaturedLocationGroup
