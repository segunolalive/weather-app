import qs from 'qs'
import axios from 'axios'
import shortid from 'shortid'

import { getImage } from './images'

const BASE_URL = process.env.REACT_APP_WEATHER_API_URL
const ACCESS_KEY = process.env.REACT_APP_WEATHER_API_ACCESS_KEY

export const urlFromCity = (city: string): string => {
  const query = qs.stringify({
    access_key: ACCESS_KEY,
    query: city,
  })

  return BASE_URL + '?' + query
}

export const getCurrentWeather = async (city: string): Promise<any> => {
  const id = shortid()
  let imageData: any = null
  try {
    imageData = await getImage(city)
    const url = urlFromCity(city)
    const { data } = await axios(url)
    data.id = id
    data.image = imageData.results[0]
    return data
  } catch (error) {
    return error
  }
}

export const getWeathers = async (cities: string[]): Promise<any> => {
  const weatherPromises = cities.map(getCurrentWeather)
  const settledPromises = await Promise.allSettled(weatherPromises)
  return settledPromises.reduce((acc: any, promise) => {
    if (promise.status === 'fulfilled') {
      acc.push(promise.value)
    }
    return acc
  }, [])
}
