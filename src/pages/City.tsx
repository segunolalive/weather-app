import React, { useEffect, useState } from 'react'
import { match } from 'react-router-dom'
import Layout from 'components/Layout'
import { REQUEST_STATUSES, cityWeatherType } from 'types'
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
  const [weather, setWeather] = useState<cityWeatherType>(location?.state)
  const [status, setStatus] = useState<REQUEST_STATUSES>(REQUEST_STATUSES.IDLE)

  useEffect(() => {
    if (!weather) {
      setStatus(REQUEST_STATUSES.LOADING)
      if (match?.params?.city) {
        getCurrentWeather({ q: match?.params?.city })
          .then((data) => {
            setWeather(data)
            setStatus(REQUEST_STATUSES.SUCCESS)
          })
          .catch(() => setStatus(REQUEST_STATUSES.ERROR))
      }
    }
  }, [])

  if (weather) {
    const {
      image,
      name,
      main,
      wind,
      visibility,
      clouds,
      rain,
      weather: cityWeather,
    } = weather
    return (
      <Layout>
        <div className="text-center">
          <div className="banner">
            <img
              src={image?.urls?.regular}
              alt=""
              height="200px"
              width="200px"
            />
            <h1>{name}</h1>
          </div>
          <h2>Temperature</h2>
          <p>
            Description: <strong>{cityWeather[0]?.description}</strong>{' '}
          </p>
          <p>
            Temperature: <strong>{main.temp}&deg;C</strong>{' '}
          </p>
          <p>
            Feels Like: <strong>{main.feels_like}&deg;C</strong>{' '}
          </p>
          <h2>Wind</h2>
          <p>
            Wind Speed: <strong>{wind.speed}m/s</strong>{' '}
          </p>
          <p>
            Wind Degree: <strong>{wind.deg}&deg;</strong>{' '}
          </p>
          <h2>Others</h2>
          <p>
            Pressure: <strong>{main.pressure}hPa</strong>{' '}
          </p>
          {rain?.['1h'] && (
            <p>
              Rain (1hr): <strong>{rain['1h']}mm</strong>{' '}
            </p>
          )}
          <p>
            Humidity: <strong>{main.humidity}%</strong>{' '}
          </p>
          <p>
            Cloudcover: <strong>{clouds.all}%</strong>{' '}
          </p>
          <p>
            Visibility: <strong>{visibility} km</strong>{' '}
          </p>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div className="text-center">
          <Placeholder status={status} />
        </div>
      </Layout>
    )
  }
}
