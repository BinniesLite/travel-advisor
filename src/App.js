import React, {useEffect, useState} from 'react'
import './App.css';
import {CssBaseline, Grid} from '@material-ui/core';
import List from './components/List/List';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import { getPlacesData } from './api/index';
import {getWeatherData} from './api/index';

function App() {
  //Store the places set from getPlacesData
  const [places, setPlaces] = useState();
  // Set the coordinate
  const [coordinates, setCoordinates] = useState({})
  // The bounds that the user 
  const [bounds, setBounds] = useState({});
  // Set the child
  const [childClicked, setchildClicked] = useState({});
  // Type of information to display
  const [type, setType] = useState('');
  // Display rating
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterPlaces, setfilterPlaces] = useState([]);
  // Weather data
  const [weatherData, setWeatherData] = useState([]); 

  // Get the current location of the user
  // Only happened at the start
  useEffect(() => {
    // Built in browser api
    navigator.geolocation.getCurrentPosition((data) => {
      const {coords: {latitude, longitude}} = data;
      setCoordinates({lat: latitude, lng: longitude});
    })
  } ,[]) 

  // Useffect only change when the the rating change
  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setfilterPlaces(filteredPlaces);
  }, [rating]);

  // get data for the places
  useEffect(() => {
    if (bounds) {
    setLoading(true);
    // This is an async function
    // Used to get the places data
    getPlacesData(bounds.ne, bounds.sw, type).then(data => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setLoading(false);
      setfilterPlaces([]);
    })}

    // This is an async function
    // Used to get weather data
    getWeatherData(coordinates.lat, coordinates.lng)
      .then((data) => setWeatherData(data));

      

  },[bounds, type]);
  
  console.log(weatherData);
  

  return (
    <>
      <CssBaseline></CssBaseline>
      <Header setCoordinate={setCoordinates}/>
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={12} md={4}>
           <List 
            places={filterPlaces?.length ? filterPlaces : places} 
            childClicked={childClicked} 
            loading={loading} 
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filterPlaces?.length ? filterPlaces : places}
              setchildClicked={setchildClicked}
              weatherData={weatherData}
            />
          </Grid>
        </Grid>
    </>
  );
}

export default App;
