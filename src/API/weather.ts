import qs from 'qs'
import axios from 'axios'

import { getImage } from './images'

const BASE_URL = process.env.REACT_APP_WEATHER_API_URL
const ACCESS_KEY = process.env.REACT_APP_WEATHER_API_ACCESS_KEY

type config = {
  q?: string
  id?: string
  lat?: number
  lon?: number
}

export const makeQerySting = (config: config): string => {
  const query = qs.stringify({
    appid: ACCESS_KEY,
    ...config,
    units: 'metric',
  })

  return BASE_URL + '?' + query
}

export const getCurrentWeather = async (config: config): Promise<any> => {
  let imageData: any = null
  try {
    const url = makeQerySting(config)
    const { data } = await axios(url)
    imageData = await getImage(data?.name || '')
    data.image = imageData.results[0]
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const getWeathers = async (cities: string[]): Promise<any> => {
  const mappedCities = cities.map((city) => ({ q: city }))
  const weatherPromises = mappedCities.map(getCurrentWeather)
  const settledPromises = await Promise.allSettled(weatherPromises)
  return Promise.resolve(
    settledPromises.reduce((acc: any, promise) => {
      if (promise.status === 'fulfilled') {
        acc.push(promise.value)
      }
      return acc
    }, [])
  )
}
