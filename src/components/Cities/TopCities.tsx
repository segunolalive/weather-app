import React, { useState, useEffect } from 'react'
import { LARGEST_CITIES } from 'utils'
import { getWeathers } from 'API'
import CityPreview from 'components/CityPreview'
import { REQUEST_STATUSES } from 'types'

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
  const [status, setStatus] = useState<REQUEST_STATUSES>(REQUEST_STATUSES.IDLE)

  useEffect(() => {
    const cities = topCities.map(({ name }: any) => name)
    setStatus(REQUEST_STATUSES.LOADING)
    getWeathers(cities).then((weathers) => {
      setCitiesWeather(weathers)
      setTopCities(weathers.map(({ id, name }: any) => ({ name, id })))
      setStatus(REQUEST_STATUSES.SUCCESS)
    })
  }, [])

  const onDelete = (id: number) => {
    setTopCities((cities: any) =>
      cities.filter((curentCity: any) => curentCity.id !== id)
    )
    setCitiesWeather((cities: any) =>
      cities.filter((curentCity: any) => curentCity.id !== id)
    )
  }

  return (
    <section className={style.section}>
      <h2>Top Cities</h2>
      <div className={style.grid}>
        {citiesWeathers.map((data: any, i: number) => {
          return <CityPreview data={data} onDelete={onDelete} key={i} />
        })}
      </div>
      <Placeholder status={status} />
    </section>
  )
}
