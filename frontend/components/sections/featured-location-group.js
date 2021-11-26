
import React, { useEffect, useState, useRef } from 'react'

import { Loader } from '@googlemaps/js-api-loader';
import { ref } from 'yup';



const FeaturedLocationGroup = ({ data }) => {

    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API,

    });

    const currLocationRef = useRef(null)

    const [map, setMap] = useState(null)
    const refs = useRef([])
    const [sharingLocation, setSharingLocation] = useState(false)


    const addToRefs = (map) => {
        if (map && !refs.current.includes(map)) {
            refs.current.push(map)
        }

    }
    console.log("sharingLocation", sharingLocation)
    let infoWindow

    const panToCurrent = async (data) => {

        await loader.load().then((google) => {

            
       
            // }
            // console.log("online", online() )
            
         
           
            infoWindow = new google.maps.InfoWindow()
            // map.controls[google.maps.ControlPosition.CENTER].push(mapRef.current)
            // console.log("navigator.geolocation", navigator.geolocation.getCurrentPosition(x => console.log(x)))
            // if (!navigator.geolocation.getCurrentPosition()) {
            //     setSharingLocation(false)
          
     
            // if (navigator.geolocation.getCurrentPosition(x => x.coords )) {
            //     setSharingLocation(true)
            // }
            // else {
            //     setSharingLocation(false)
            // }
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


    const futureLocationsMapLoadHandler = async (data) => {

        const location = data.map(async (location) => {

            location.address = location.address.replace(/\s/g, "+")
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`
            const response = await fetch(url)
            const data = await response.json()


            return {

                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng,
            }
        })



        const locations = await Promise.all(location)
        await loader.load().then((google) => {



            locations.map(async (location) => {


                refs.current.map((mapRef) => {


                    const map = new window.google.maps.Map(mapRef, {
                        zoom: 14,
                        center: location,
                    });
                    const marker = new window.google.maps.Marker({
                        position: location,
                        map: map
                    })


                });


                setMap(map)
            })


        }).catch(e => {

            console.log("error", e)
        });

    }


    useEffect(() => {

        if (!map) {

            panToCurrent(data)
            futureLocationsMapLoadHandler(data.locations)
            const online = () => {
                console.log('navonline', navigator.onLine)
                return navigator.onLine
            }
            if (online()) {
                setSharingLocation(true)
            }
            else {
                setSharingLocation(false)
            }
        }


    }, [map])









    return (
        <>





            {sharingLocation && <div className="map-container" ref={currLocationRef} style={{ height: '100vh', width: '100%' }} />}
            {/* <div className="map-container" ref={currLocationRef} style={{ height: '100vh', width: '100%' }} /> */}














            {data.locations.map((location, index) => {

                const removeChar = (x) => x.address.replace(/\+/g, " ")
                const formattedAddress = removeChar(location)

                return (
                    <div key={index} style={{
                        color: "black",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        fontSize: "1.5rem",

                        margin: "1rem",
                        padding: "1rem",
                        border: "1px solid black",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        boxShadow: "0px 0px 10px black"

                    }}>

                        <div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.name && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>Location </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.name}</h1>
                                </>

                                }
                            </div >

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.address && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",
                                    }} >Address </h1>
                                    <h1 style={{

                                    }} > {formattedAddress}</h1>
                                </>

                                }
                            </div >


                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.hours && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>hours </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.hours}</h1>
                                </>

                                }
                            </div >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.date && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>Date </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.date}</h1>
                                </>

                                }
                            </div >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.open_time && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>Open Time </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.open_time}</h1>
                                </>

                                }
                            </div >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.close_time && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>Close Time </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.close_time}</h1>
                                </>

                                }
                            </div >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.content && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>Description </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.content}</h1>
                                </>

                                }
                            </div >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.website && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>Website Link </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.website}</h1>
                                </>

                                }
                            </div >
                            {/* <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column"


                            }}>
                                {location.images && <>
                                    <h1 style={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",

                                    }}>Images </h1>
                                    <h1 style={{
                                        fontSize: "1.3rem"
                                    }} > {location.images}</h1>
                                </>

                                }
                            </div  > */}



                        </div>

                        <div ref={addToRefs} style={{
                            height: "100vh", className: "map-container",
                            width: "100vw",
                        }}>

                        </div>





                    </div>
                )
            })}


        </>
    )
}





export default FeaturedLocationGroup
