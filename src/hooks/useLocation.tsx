import React, { useEffect, useState } from 'react'
import { getCurrentWeather } from 'API'
import { REQUEST_STATUSES } from 'models'

type locationStateType = {
  lat: number
  lon: number
}

type locationType = locationStateType | null

export function useLocation() {
  const [location, setLocation] = useState<locationType>(null)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => console.error(error)
      )
    }
  }, [])

  return location
}

export function useLocationWeather(location: locationType) {
  const [weather, setWeather] = useState<any>(null)
  const [status, setStatus] = useState(REQUEST_STATUSES.IDLE)
  useEffect(() => {
    if (location) {
      setStatus(REQUEST_STATUSES.LOADING)
      getCurrentWeather(location)
        .then((weatherInfo) => {
          setStatus(REQUEST_STATUSES.SUCCESS)
          setWeather(weatherInfo)
        })
        .catch(() => setStatus(REQUEST_STATUSES.ERROR))
    }
  }, [location?.lat, location?.lon])

  return {
    status,
    weather,
    coords: null,
  }
}
