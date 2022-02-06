import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import mapStyles from "./MapStyles";
import useStyles from "./styles";

import "./Map.css"

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
  // For styling
  const classes = useStyles();
  // If the width of the screen is below 600px turn this to true
  const isMobile = useMediaQuery("(min-width:600px)");
  return (
    <div>
      <div className={classes.mapContainer}>
        {/* Google map react will show you when something change */}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCn1ysV0qPWv-bIyLA9XX5pZdmlbBZxtDU",
            language: "vn",
          }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          // Set the margin 50 to the top, 50
          // to the right and 50 to the left
          // 50 to the right
          margin={[50, 50, 50, 50]}
          options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles  }}
          onChange={(e) => {
            setCoordinates({
              lat: e.center.lat,
              lng: e.center.lng,
            });
            setBounds({
              ne: e.marginBounds.ne,
              sw: e.marginBounds.sw,
            });
          }}
          // When you c
          onChildClick={(child) => setChildClicked(child)}
        >
          {places?.length && places?.map((place, i) => {
            console.log("Fuck you");
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {<Paper elevation={3} className={classes.paper}>
                  {console.log("Bye World")}
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly/>
                </Paper>
              }
            </div>;
          })}
          {weatherData?.list?.map((data, i) => {
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img height="100px" src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" />
            </div>
          }) }
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
