import React from 'react'
import { TopCities, FavouriteCities } from 'components/Cities'
import Search from 'components/Search'

export default function Home() {
  return (
    <>
      <Search />
      <FavouriteCities />
      <TopCities />
    </>
  )
}
