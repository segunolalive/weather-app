import React, { createContext, useEffect } from 'react'
import { getWeathers } from 'API'
import { useLocalStorage } from 'hooks'

const defaultContext: any = {
  favourites: [],
  deleteFavourite: (id: number): void => {},
  addFavourite: (city: any): void => {},
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
      getWeathers(favourites.map((item: any) => item.name))
        .then(setFavourites)
        .catch(console.log)
    }
  }, [])

  const deleteFavourite = (id: number) => {
    setFavourites((favourites: any) =>
      favourites.filter((favourite: any) => favourite.id !== id)
    )
  }
  const addFavourite = (city: any) =>
    setFavourites((favourites: any) => [...favourites, city])

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
