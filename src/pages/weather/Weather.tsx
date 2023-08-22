import "./Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import dayjs from "dayjs";

// https://openweathermap.org/api
//null coalescing - ?? (also called fallback operator)
export default function Weather({ weatherData }) {
  const WeatherIcon = styled.div`
    color: whitesmoke;
  `;

  const refresh = () => {
    window.location.reload();
  };

  let weatherIcon = null;

  if (weatherData.weather[0].main === "Thunderstorm") {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (weatherData.weather[0].main === "Drizzle") {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (weatherData.weather[0].main === "Rain") {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (weatherData.weather[0].main === "Snow") {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (weatherData.weather[0].main === "Clear") {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (weatherData.weather[0].main === "Clouds") {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <div className="main">
      <div className="top">
        <p className="header">{weatherData.name}</p>
        <Button
          className="button"
          inverted
          color="blue"
          circular
          icon="refresh"
          onClick={refresh}
        />
      </div>
      <div className="flex">
        {// dayjs needs to be updated to show the proper date
        }
        <p className="day">{dayjs(weatherData.dt * 1000).format("dddd")}</p>
        <div className="flex">
          <WeatherIcon style={{ fontSize: 30, marginTop: 15 }}>
            {weatherIcon}
          </WeatherIcon>
          <p className="description">{weatherData.weather[0].main}</p>
       
        </div>
      </div>

      <div className="flex">
        <p className="temp">{weatherData.main.temp} &deg;C</p>
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
        </p>
        <p className="sunrise-sunset">
          Sunset:{" "}
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}
        </p>
      </div>
    </div>
  );
}
