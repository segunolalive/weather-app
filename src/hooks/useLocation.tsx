import React, { useEffect, useState } from 'react'
import { getCurrentWeather } from 'API'
import { REQUEST_STATUSES } from 'models'

type locationStateType = {
  latitude: number
  longitude: number
}

type locationType = locationStateType | null

export function useLocation() {
  const [location, setLocation] = useState<locationType>(null)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    }
  }, [])

  return location
}

export function useLocationWeather(location: locationType) {
  const [weather, setWeather] = useState<any>(null)
  const [status, setStatus] = useState(REQUEST_STATUSES.IDLE)
  let cityCoords
  useEffect(() => {
    if (location) {
      cityCoords = `${location.latitude},${location.longitude}`
      setStatus(REQUEST_STATUSES.LOADING)
      getCurrentWeather(cityCoords)
        .then((weatherInfo) => {
          setStatus(REQUEST_STATUSES.SUCCESS)
          setWeather(weatherInfo)
        })
        .catch(() => setStatus(REQUEST_STATUSES.ERROR))
    }
  }, [location])

  return {
    status,
    weather,
    coords: cityCoords,
  }
}
