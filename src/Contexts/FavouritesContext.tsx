import React, { createContext, useEffect, useState } from 'react'
import { getWeathers } from 'API'

const defaultContext: any = {
  favourites: [],
  deleteFavourite: (city: any): void => {},
  addFavourite: (city: any): void => {},
}

const FavouriteContext = createContext(defaultContext)

const { Provider } = FavouriteContext

type Props = {
  children: React.ReactChild
}

export function FavouritesProvider({ children }: Props) {
  const [favourites, setFavourites] = useState<any[]>([])
  const [favouriteCitiesWeather, setFavouriteCitiesWeather] = useState<any[]>([])
  useEffect(() => {
    getWeathers(favourites).then(setFavouriteCitiesWeather).catch(console.log)
  }, [favourites.length])

  const deleteFavourite = (city: any) => {
    setFavourites((favourites) =>
      favourites.filter((favourite) => favourite !== city.location.name)
    )
  }
  const addFavourite = (city: any) =>
    setFavourites((favourites) => [...favourites, city.location.name])

  return (
    <Provider
      value={{ favourites, favouriteCitiesWeather, addFavourite, deleteFavourite }}
    >
      {children}
    </Provider>
  )
}

export default FavouriteContext
