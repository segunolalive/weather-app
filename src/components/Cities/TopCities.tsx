import React, { useState, useEffect, useContext } from 'react'
import { LARGEST_CITIES } from 'utils'
import { getWeathers } from 'API'
import CityPreview from 'components/CityPreview'
import FavouritesContext from 'Contexts/FavouritesContext'

import style from './topcities.module.css'

export default function TopCities() {
  const [topCities, setTopCities] = useState(LARGEST_CITIES)
  const [citiesWeathers, setCitiesWeather] = useState<any[]>([])
  const { addFavourite } = useContext(FavouritesContext)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    getWeathers(topCities)
      .then((weathers) => {
        if (weathers.success !== 'false') {
          setCitiesWeather(weathers)
        } else {
          throw new Error('An error occured')
        }
      })
      .catch(setError)
  }, [])

  const onDelete = (city: any) => {
    setTopCities((cities) => cities.filter((curentCity) => curentCity !== city))
    setCitiesWeather((cities) =>
      cities.filter((curentCity) => curentCity.id !== city.id)
    )
  }

  return (
    <section className={style.section}>
      <h2>Top Cities</h2>
      <div className={style.grid}>
        {citiesWeathers.map((data, i) => (
          <CityPreview
            data={data}
            onFavorite={addFavourite}
            onDelete={onDelete}
            key={i}
          />
        ))}
      </div>
    </section>
  )
}
