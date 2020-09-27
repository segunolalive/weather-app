import React, { createContext, useEffect } from 'react'
import { getWeathers } from 'API'
import { useLocalStorage } from 'hooks'
import { cityWeatherType } from 'types'

type favouriteContextType = {
  favourites: cityWeatherType[]
  deleteFavourite: (id: number) => void
  addFavourite: (city: cityWeatherType) => void
}

const defaultContext: favouriteContextType = {
  favourites: [],
  deleteFavourite: (id) => {},
  addFavourite: (city) => {},
}

const FavouriteContext = createContext(defaultContext)

const { Provider } = FavouriteContext

type Props = {
  children: React.ReactChild
}

export function FavouritesProvider({ children }: Props) {
  const [favourites, setFavourites]: any = useLocalStorage('favourites', [])
  useEffect(() => {
    if (favourites.length) {
      getWeathers(favourites.map((item: cityWeatherType) => item.name))
        .then(setFavourites)
        .catch(console.log)
    }
  }, [])

  const deleteFavourite = (id: number) => {
    setFavourites((favourites: cityWeatherType[]) =>
      favourites.filter((favourite: cityWeatherType) => favourite.id !== id)
    )
  }
  const addFavourite = (city: cityWeatherType) =>
    setFavourites((favourites: cityWeatherType[]) => [...favourites, city])

  return (
    <Provider
      value={{
        favourites,
        addFavourite,
        deleteFavourite,
      }}
    >
      {children}
    </Provider>
  )
}

export default FavouriteContext
