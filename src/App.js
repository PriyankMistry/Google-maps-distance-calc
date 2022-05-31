import React, { useRef, useState } from 'react';
import "./Assets/Home.css";
import capture1 from "./Assets/Capture 1.png";
import MonthlyAmount_info from './Components/MonthlyAmount_info';
import placeholder from "./Assets/placeholder 2.png";
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const center = {lat: 48.8584, lng: 2.2945}

export default function App() {

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ",
    libraries: ['places'],
  })

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [originstate, setOriginstate] = useState('');
  const [destinationstate, setDestinationstate] = useState('');

  const originRef = useRef()
  const destinationRef = useRef()

  if (!isLoaded){
    return (<p>Loading</p>)
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === ''){
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
  }

  
  return (
    <>
    <div className='Navbar'>
      <div className="bg"></div>
    </div>
    <div className="Graviti_logo"></div>
    <div className="Title">
        <p>Let's calculate <strong>distance</strong> from Google maps</p>
    </div>
    <div className="origin">
      <label htmlFor="" className='originlable'><p>Origin</p></label>
      <div className="oformelement">
        <form action="" className='oformstyle'>
          <img src={placeholder} alt="" />
          <input type="text" className='oinput' placeholder='Origin' ref={originRef} onChange={(e) => {
            setOriginstate(e.target.value)
          }}/>
        </form>
      </div>
    </div>
    <div className="destination">
      <label htmlFor="" className='destinationlable'><p>Destination</p></label>
      <div className="dformelement">
        <form action="" className='dformstyle'>
          <img src={placeholder} alt="" />
          <input type="text" className='dinput' placeholder='Destination' ref={destinationRef} onChange={(e) => {
            setDestinationstate(e.target.value)
          }}/>
        </form>
      </div>
    </div>
    <div className="Card">
      <div className="container">
        <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'100%', height:'100%'}}>
          <Marker position={center}/>
          {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        </GoogleMap>
      </div>
    </div>
    <MonthlyAmount_info final={distance} originplace={originstate} destinationplace={destinationstate}/>
    <div className="">
      <button className='cta' type='submit' onClick={calculateRoute}><div className='button'>Calculate</div></button>
    </div>
    </>
  )
}

