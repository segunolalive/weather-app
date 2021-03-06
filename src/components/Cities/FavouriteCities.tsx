import React, { useContext } from 'react'
import CityPreview from 'components/CityPreview'
import { FavouritesContext } from 'Contexts'
import style from './topcities.module.css'

export default function FavouriteCities() {
  const { favourites, deleteFavourite } = useContext(FavouritesContext)

  return (
    <section className={style.section} aria-labelledby="favourites">
      <h2 id="favourites">Favourites</h2>
      {favourites.length ? (
        <div className={style.grid}>
          {favourites.map((favourite, i) => (
            <CityPreview data={favourite} key={i} onDelete={deleteFavourite} />
          ))}
        </div>
      ) : (
        <p>You have no favourite cities. Add some</p>
      )}
    </section>
  )
}
