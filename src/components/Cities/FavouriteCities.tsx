import React, { useContext } from 'react'
import CityPreview from 'components/CityPreview'
import FavouritesContext from 'Contexts/FavouritesContext'
import style from './topcities.module.css'

export default function FavouriteCities() {
  const { favouriteCitiesWeather, deleteFavourite } = useContext(
    FavouritesContext
  )

  return (
    <section className={style.section} aria-labelledby="favourites">
      <h2 id="favourites">Favourites</h2>
      {favouriteCitiesWeather.length ? (
        <div className={style.grid}>
          {favouriteCitiesWeather.map((data: any, i: number) => (
            <CityPreview
              data={data}
              key={i}
              onDelete={deleteFavourite}
              isFavourite={true}
            />
          ))}
        </div>
      ) : (
        <p>You haven't added any favourite cities yet.</p>
      )}
    </section>
  )
}
