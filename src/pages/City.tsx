import React, { useEffect, useState } from 'react'
import { match } from 'react-router-dom'
import { REQUEST_STATUSES, cityWeatherType } from 'types'
import { getCurrentWeather } from 'API'
import CityDetail from 'components/CityDetail'

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

  return <CityDetail weatherInfo={weather} status={status} />
}
