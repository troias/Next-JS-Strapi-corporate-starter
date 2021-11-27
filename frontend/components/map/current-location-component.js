
import React, { useEffect, useState, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader';

 const CurrentLocationComponent = () => {

    const [sharingLocation, setSharingLocation] = useState(false);

    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API,

    });

    let infoWindow

    const panToCurrent = async (data) => {

        await loader.load().then((google) => {

            

            infoWindow = new google.maps.InfoWindow()
      
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log("position", position)
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    if(!pos) {
                        setSharingLocation(false)
                    }
                    const map = new google.maps.Map(currLocationRef.current, {
                        center: pos,
                        zoom: 15,
                    });
                    const marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: 'Hello World!'
                    });
                    infoWindow.setPosition(pos)
                    infoWindow.setContent('Suck my dick biarch')
                    infoWindow.open(map)

                    map.setCenter(pos)
                   
                  
                }),
                    function () {
                        handleLocationError(true, infoWindow, map.getCenter())
                    }
                    
                  
            }
            
            


        }

        ).catch((err) => {
            console.log(err)
        })


    }

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos)
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.')
        infoWindow.open(map)
    }


    return (
        <div>
             {sharingLocation && <div className="map-container" ref={currLocationRef} style={{ height: '100vh', width: '100%' }} />}
        </div>
    )
}

export default CurrentLocationComponent