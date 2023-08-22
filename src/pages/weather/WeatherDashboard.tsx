import { useCallback, useEffect, useState, useMemo } from "react";
import { useLocation } from "./hooks";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import Weather from "./Weather";

// props vs state

// what are the limitations of props?
// when should you use state?

// const Toggle = () => {
//   const [isCurrentWeather, setIsCurrentWeather] = useState(true);
//   return <button onClick={() => setIsCurrentWeather((prev) => !prev)}>Forecast</button>
// }

// props are immutable
const WeatherDashboard = () => {
  const [lat, long] = useLocation();
  // value, and setter for state
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(undefined);
  const [forecastData, setForecastData] = useState(undefined);
  const [isCurrentWeather, setIsCurrentWeather] = useState(true);

  // React Functional Component 
  const toggle = useCallback(() => {
    // const [isCurrentWeather, setIsCurrentWeather] = useState(true); // cannot use React Hooks inside a regular function - only Component
    setIsCurrentWeather((prevState) => !prevState);
  }, [])

  const mapDataToWeatherInterface = (forecastData) => {
    const mapped = {
      date: forecastData.dt * 1000,
      description: forecastData.weather[0].main,
      temperature: Math.round(forecastData.main.temp),
    };
    return mapped;
  }
    
  
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
      return weatherData;
    }
  }, []);

  const getForecast = useCallback(async (lat, long) => {

    const result = await fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    if (!result.ok) {
      return new Error("cannot get forecast");
    }

    const forecastData = await result.json();
    if (Object.entries(forecastData).length) {
      return forecastData.list
      .filter(forecast => forecast.dt_txt.match(/09:00:00/))
      // .map(mapped);
    }

  }, []);

  //calls our fetch function to get data & sets state
  useEffect(() => {
    if (lat && long && !isLoading && !weatherData) {
      /*
      Assignments to the 'isLoading' variable from inside React Hook useEffect will be lost after each render. 
      To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. 
      Otherwise, you can move this variable directly inside useEffect.eslint
      */
      setIsLoading(true);
      getWeather(lat, long)
        .then((data) => setWeatherData(data))
        .finally(() => setIsLoading(false));
    }
  }, [getWeather, isLoading, lat, long, weatherData]);

  useEffect(() => {
    if (lat && long && !isLoading && !forecastData) {
      setIsLoading(true);
      getForecast(lat, long)
      .then((data) => {
        console.log("forecast data", data);
        setForecastData(data)
      })
      .finally(() => setIsLoading(false));
    }
  }, [getForecast, isLoading, lat, long, forecastData]);

  const WeatherData = useMemo(() => {
    if(isLoading)
    {
      return (        
      <div>
        <Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer>
      </div>)
    }

    if(isCurrentWeather && weatherData)
    {
      return(
      <div>
        <button  onClick={toggle}> Show 5-Day Forecast</button>
        <Weather weatherData={weatherData}/>
      </div>)
    }

    if(!isCurrentWeather && forecastData)
    {
      return (
      <div>
          <button  onClick={toggle}> Show 1-Day Forecast</button>
          {forecastData.map(forecastData => <Weather weatherData={forecastData} />)}
      </div>)
    }

    return (<div>error</div>)

  }, [isCurrentWeather, weatherData, forecastData, isLoading, toggle])



  //we conditionally render here using a ternary to show a loading screen or the actual data
  return (
    <div>
      {WeatherData}
    </div>
  );
};

export default WeatherDashboard;
