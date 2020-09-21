import React, { useState, useEffect, useContext } from 'react'
import { LARGEST_CITIES } from 'utils'
import { getWeathers } from 'API'
import CityPreview from 'components/CityPreview'
import FavouritesContext from 'Contexts/FavouritesContext'
import { REQUEST_STATUSES } from 'models'

import style from './topcities.module.css'
import Placeholder from 'components/Placeholder'
import { useLocalStorage } from 'hooks'

export default function TopCities() {
  const [topCities, setTopCities]: any = useLocalStorage(
    'topCities',
    LARGEST_CITIES
  )
  const [citiesWeathers, setCitiesWeather]: any[] = useLocalStorage(
    'topCitiesWeathers',
    []
  )
  const { addFavourite } = useContext(FavouritesContext)
  const [status, setStatus] = useState<REQUEST_STATUSES>(REQUEST_STATUSES.IDLE)

  useEffect(() => {
    setStatus(REQUEST_STATUSES.LOADING)
    getWeathers(topCities)
      .then((weathers) => {
        setCitiesWeather(weathers)
        setTopCities(weathers.map((weather: any) => weather.location.name))
        setStatus(REQUEST_STATUSES.SUCCESS)
      })
      .catch(() => setStatus(REQUEST_STATUSES.ERROR))
  }, [])

  const onDelete = (city: any) => {
    setTopCities((cities: any) =>
      cities.filter(
        (curentCity: any) =>
          curentCity.toLowerCase() !== city.location.name.toLowerCase()
      )
    )
    setCitiesWeather((cities: any) =>
      cities.filter((curentCity: any) => curentCity.id !== city.id)
    )
  }

  return (
    <section className={style.section}>
      <h2>Top Cities</h2>
      <Placeholder status={status} />
      {status === REQUEST_STATUSES.SUCCESS && (
        <div className={style.grid}>
          {citiesWeathers.map((data: any, i: number) => (
            <CityPreview
              data={data}
              onFavorite={addFavourite}
              onDelete={onDelete}
              key={i}
            />
          ))}
        </div>
      )}
    </section>
  )
}
