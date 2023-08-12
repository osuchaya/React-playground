import { useCallback, useEffect, useState } from "react";
import { useLocation } from "./hooks";
import { Dimmer, Loader } from "semantic-ui-react";
import Weather from "./Weather";

const WeatherDashboard = () => {
  const [lat, long] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(undefined);

  //gets the weather data from api using fetch
  //this is wrapped in `useCallback` so as to not cause the `useEffect` to execute on each render
  const getWeather = useCallback(async (lat, long) => {
    const result = await fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    if (!result.ok) {
      return new Error("An error occurred");
    }

    const weatherData = await result.json();
    if (Object.entries(weatherData).length) {
      debugger;
      return weatherData;
    }
  }, []);

  //calls our fetch function to get data & sets state
  useEffect(() => {
    if (lat && long && !isLoading && !weatherData) {
      setIsLoading(true);
      getWeather(lat, long)
        .then((data) => setWeatherData(data))
        .finally(() => setIsLoading(false));
    }
  }, [getWeather, isLoading, lat, long, weatherData]);

  //we conditionally render here using a ternary to show a loading screen or the actual data
  return (
    <div>
      {!isLoading && weatherData ? (
        <div>
          <Weather weatherData={weatherData} />
        </div>
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
