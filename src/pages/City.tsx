import React, { useEffect, useState } from 'react'
import { match, RouteComponentProps } from 'react-router-dom'
import Layout from 'components/Layout'
import { REQUEST_STATUSES } from 'models'
import { getCurrentWeather } from 'API'
import Placeholder from 'components/Placeholder'

type cityDetailsParams = {
  city: string
}

type cityProps = {
  match?: match<cityDetailsParams>
  location: any
}

export default function City({ location, match }: cityProps) {
  const [weather, setWeather] = useState<any>(location?.state?.weather)
  const [status, setStatus] = useState<REQUEST_STATUSES>(REQUEST_STATUSES.IDLE)

  console.log({ location })

  useEffect(() => {
    if (!weather) {
      setStatus(REQUEST_STATUSES.LOADING)
      getCurrentWeather(match?.params?.city || '')
        .then((data) => {
          if (data.success !== 'false') {
            setWeather(data)
            setStatus(REQUEST_STATUSES.SUCCESS)
          } else {
            setStatus(REQUEST_STATUSES.ERROR)
          }
        })
        .catch(() => setStatus(REQUEST_STATUSES.ERROR))
    }
  }, [])

  if (weather) {
    const { current, location: cityLocation } = weather
    return (
      <Layout>
        <div className="text-center">
          <h1>{cityLocation.name}</h1>
          <h2>Temperature</h2>
          <p>Description: {current.weather_descriptions.join(', ')}</p>
          <p>Temperature: {current.temperature}&deg;C </p>
          <p>Feels Like: {current.feels_like}&deg;C </p>
          <h2>Wind</h2>
          <p>Wind Direction: {current.wind_dir}</p>
          <p>Wind Speed: {current.wind_speed} Km/hr</p>
          <p>Wind Degree: {current.wind_degree}</p>
          <h2>Others</h2>
          <p>Pressure: {current.pressure}MB</p>
          <p>Precipitation: {current.precipitation}mm</p>
          <p>Humidity: {current.humidity}%</p>
          <p>Cloudcover: {current.cloudcover}%</p>
          <p>UV Index: {current.uv_index}</p>
          <p>Visibility: {current.visibility} km</p>
        </div>
      </Layout>
    )
  } else {
    return <Placeholder status={status} />
  }
}
