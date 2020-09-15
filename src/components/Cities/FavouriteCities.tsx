import React, { useState, useEffect } from 'react'
import { getWeathers } from 'API'
import CityPreview from 'components/CityPreview'
import style from './topcities.module.css'

export default function FavouriteCities() {
  const [favouriteCities, setFavouriteCities] = useState([])

  useEffect(() => {
    getWeathers(favouriteCities).then(setFavouriteCities).catch(console.log)
  }, [favouriteCities.length])

  return (
    <section className={style.section} aria-labelledby="favourites">
      <h2 id="favourites">Favourites</h2>
      {favouriteCities.length ? (
        <div className={style.grid}>
          {favouriteCities.map((weather, i) => (
            <CityPreview {...weather} key={i} />
          ))}
        </div>
      ) : (
        <p>You haven't added any favourite cities yet.</p>
      )}
    </section>
  )
}
