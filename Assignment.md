# Assignment 1

The weather app should get the user's location from the browser and correctly query the weather api to get some basic weather information when you run this app.

Let's say that the user instead wants to be able to see the current date and a forecast.

The weather api provides an endpoint for grabbing a forecast of 5 days.

The endpoint is this: `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`

You can read more about it and the return type of the data on the website:
`https://openweathermap.org/forecast5`

In `WeatherDashboard.tsx` you will need to add a new function that is similar to `getWeather()`. This new function will call the forecast endpoint and retrieve a weather forecast for the next 5 days.

Once you have the data, you can map it to a common format such that it can be passed in to `Weather.tsx` - OR - you can build a new component that supports some other interface that you define. Take a close look at the data that is returned from the forecast5 endpoint. It returns an array of times at various points in a day every 3 hours. Ideally, we just want to take the morning time from each day.

> #### HINT:
>
> you can do something like this:

```
forecastData.list
            .filter(forecast => forecast.dt_txt.match(/09:00:00/))
```

> and filter the array based on the `dt_txt` property which will only take the array elements that match 9:00AM.

Whichever approach you decide on, you also need to provide a toggle button on the `WeatherDashboard.tsx`. When clicked, it will show the 5-day-forecast if the current day weather is showing. If the 5-day-forecast is showing it show should the current day weather. Effectively, it swaps between the two views.
