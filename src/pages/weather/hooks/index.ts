import { useEffect, useState } from "react";

export const useLocation = () => {
  const [lat, setLat] = useState(undefined);
  const [long, setLong] = useState(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  });

  return [lat, long];
};
