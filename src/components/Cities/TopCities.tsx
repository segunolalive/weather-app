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
  const [topCities, setTopCities] = useState(LARGEST_CITIES)
  const [storedCities, setStoredCities]: any = useLocalStorage('topCities', [])
  const [citiesWeathers, setCitiesWeather] = useState<any[]>(storedCities)
  const { addFavourite } = useContext(FavouritesContext)
  const [status, setStatus] = useState<REQUEST_STATUSES>(REQUEST_STATUSES.IDLE)

  useEffect(() => {
    setStatus(REQUEST_STATUSES.LOADING)
    getWeathers(topCities)
      .then((weathers) => {
        if (weathers.success !== 'false') {
          setCitiesWeather(weathers)
          setStoredCities(weathers)
          setStatus(REQUEST_STATUSES.SUCCESS)
        } else {
          setStatus(REQUEST_STATUSES.ERROR)
        }
      })
      .catch(() => setStatus(REQUEST_STATUSES.ERROR))
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
      <Placeholder status={status} />
      {status === REQUEST_STATUSES.SUCCESS && (
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
      )}
    </section>
  )
}
