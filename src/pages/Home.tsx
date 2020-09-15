import React from 'react'
import Layout from 'components/Layout'
import {TopCities, FavouriteCities} from 'components/Cities'
import SearchBox from 'components/SearchBox'
import { useData } from 'hooks'
import { REQUEST_STATUSES } from 'models'

export default function Home() {
  return (
    <Layout>
      <SearchBox searchFn={console.log} />
      <FavouriteCities />
      <TopCities />
    </Layout>
  )
}
