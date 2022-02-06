import { useState } from "react";
var axios = require("axios").default;

export const getPlacesData = async (ne, sw, type) => {
  var options = {
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      "x-rapidapi-key": "b51d086105msh50ca0aa73611a01p10c4b8jsn910a1ef00f1f",
    },
  };

  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      options
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        params: {
          lon: lng,
          lat: lat,
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "b51d086105msh50ca0aa73611a01p10c4b8jsn910a1ef00f1f",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
