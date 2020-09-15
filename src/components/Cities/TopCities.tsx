import React, { useState, useEffect } from 'react'
import { LARGEST_CITIES } from 'utils'
import { getWeathers } from 'API'
import CityPreview from 'components/CityPreview'
import style from './topcities.module.css'

export default function TopCities() {
  const [topCities, setTopCities] = useState(LARGEST_CITIES)
  const [citiesWeathers, setCitiesWeather] = useState<any[]>([])

  useEffect(() => {
    getWeathers(topCities).then(setCitiesWeather).catch(console.log)
  }, [])

  const onDelete = (city: any) => {
    setTopCities((cities) => cities.filter((city) => city !== city))
    setCitiesWeather((cities) => cities.filter((city) => city.id !== city.id))
  }

  return (
    <section className={style.section}>
      <h2>Top Cities</h2>
      <div className={style.grid}>
        {citiesWeathers.map((data, i) => (
          <CityPreview data={data} onDelete={onDelete} key={i} />
        ))}
      </div>
    </section>
  )
}
