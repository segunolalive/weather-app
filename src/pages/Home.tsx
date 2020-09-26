import React, { useEffect } from 'react'

import Layout from 'components/Layout'
import { RouteComponentProps } from 'react-router-dom'
import { TopCities, FavouriteCities } from 'components/Cities'
import Search from 'components/Search'
import { useLocation, useLocationWeather } from 'hooks'
import { REQUEST_STATUSES } from 'models'

export default function Home({ history }: RouteComponentProps) {
  const { status, weather } = useLocationWeather({ lat: 6, lon: 3 })
  console.log({ status, id: weather?.id })

  useEffect(() => {
    if (status === REQUEST_STATUSES.SUCCESS && weather) {
      if (
        window.confirm('Would you like to see the weather in your location?')
      ) {
        history.push(`/${weather.name}`, weather)
      }
    }
  }, [status, weather?.id])

  return (
    <Layout>
      <Search />
      <FavouriteCities />
      <TopCities />
    </Layout>
  )
}
