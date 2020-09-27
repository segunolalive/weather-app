export type coordsType = {
  lat: number
  lon: number
}

type weatherDescriptionType = {
  id: number
  main: string
  description: string
  icon: string
}

type sysType = {
  type: number
  id: number
  message: number
  country: number
  sunrise: number
  sunset: number
}

export type cityWeatherType = {
  image?: any
  rain?: any
  coord: coordsType
  weather: weatherDescriptionType[]
  base: string
  main: Record<string, string>
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: sysType
  timezone: number
  id: number
  name: string
  cod: number
}

export type clickHandlerType = (
  event: React.MouseEvent<HTMLButtonElement>
) => void

export enum REQUEST_STATUSES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export type topCityType = {
  name: string
  id: number
}
