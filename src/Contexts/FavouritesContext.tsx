import React, { createContext, useEffect, useState } from 'react'
import { getWeathers } from 'API'
import { FavouriteCities } from 'components/Cities'

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
  const [favouritesWeather, setFavouritesWeather] = useState<any[]>([])
  useEffect(() => {
    getWeathers(favourites).then(setFavouritesWeather).catch(console.log)
  }, [favourites.length])

  const deleteFavourite = (city: any) => {
    setFavourites((favourites) =>
      favourites.filter((favourite) => favourite !== city)
    )
  }
  const addFavourite = (city: any) =>
    setFavourites((favourites) => [...favourites, city.current.name])

  return (
    <Provider
      value={{ favourites: favouritesWeather, addFavourite, deleteFavourite }}
    >
      {children}
    </Provider>
  )
}

export default FavouriteCities
