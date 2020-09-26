import React, { useContext } from 'react'
import CityPreview from 'components/CityPreview'
import FavouritesContext from 'Contexts/FavouritesContext'
import style from './topcities.module.css'

export default function FavouriteCities() {
  const { favourites, deleteFavourite } = useContext(FavouritesContext)

  return (
    <section className={style.section} aria-labelledby="favourites">
      <h2 id="favourites">Favourites</h2>
      {favourites.length ? (
        <div className={style.grid}>
          {favourites.map((data: any, i: number) => (
            <CityPreview
              data={data}
              key={i}
              onDelete={deleteFavourite}
            />
          ))}
        </div>
      ) : (
        <p>You have no favourite cities. Add some</p>
      )}
    </section>
  )
}
