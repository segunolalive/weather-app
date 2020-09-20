import React, { createContext, useEffect, useState } from 'react'
import { getWeathers } from 'API'
import { useLocalStorage } from 'hooks'

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
  const [storedFavourites, setStoredFavourites]: any = useLocalStorage(
    'favourites',
    []
  )
  const [favouriteCitiesWeather, setFavouriteCitiesWeather] = useState<any[]>(
    storedFavourites
  )
  useEffect(() => {
    getWeathers(favourites)
      .then((weather) => {
        if (weather.success !== 'false') {
          setFavouriteCitiesWeather(weather)
          setStoredFavourites(weather)
        }
      })
      .catch(console.log)
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
      value={{
        favourites,
        favouriteCitiesWeather,
        addFavourite,
        deleteFavourite,
      }}
    >
      {children}
    </Provider>
  )
}

export default FavouriteContext
