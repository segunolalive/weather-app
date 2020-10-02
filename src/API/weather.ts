import qs from 'qs'
import axios from 'axios'

import { getImage } from './images'
import { cityWeatherType } from 'types'

const BASE_URL = process.env.REACT_APP_WEATHER_API_URL
const ACCESS_KEY = process.env.REACT_APP_WEATHER_API_ACCESS_KEY

type config = {
  q?: string
  id?: string
  lat?: number
  lon?: number
}

export const makeQuerySting = (config: config): string => {
  const query = qs.stringify({
    appid: ACCESS_KEY,
    ...config,
    units: 'metric',
  })

  return BASE_URL + '?' + query
}


export const getCurrentWeather = async (
  config: config
): Promise<cityWeatherType> => {
  let imageData: any = null
  try {
    const url = makeQuerySting(config)
    const { data } = await axios(url.toLowerCase())
    imageData = await getImage(data?.name || '')
    data.image = imageData?.results?.[0]
    return data
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getWeathers = async (
  cities: string[]
): Promise<cityWeatherType[]> => {
  const mappedCities = cities.map((city) => ({ q: city }))
  const weatherPromises = mappedCities.map(getCurrentWeather)
  const settledPromises = await Promise.allSettled(weatherPromises)
  return Promise.resolve(
    settledPromises.reduce((acc, promise) => {
      if (promise.status === 'fulfilled') {
        acc.push(promise.value)
      }
      return acc
    }, [] as cityWeatherType[])
  )
}
