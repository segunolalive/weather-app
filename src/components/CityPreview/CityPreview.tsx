import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import FavouritesContext from 'Contexts/FavouritesContext'
import DeleteButton from './DeleteButton'
import FavouriteButton from './FavouriteButton'
import style from './city-preview.module.css'
import { cityWeatherType } from 'types'

type cityProp = {
  data: cityWeatherType
  onDelete?: (cityId: number) => void
  deleteable?: boolean
}

export default function CityPreview({
  data,
  onDelete = () => {},
  deleteable = true,
}: cityProp) {
  const {
    id,
    name,
    image,
    main: { temp },
  } = data

  const { favourites, addFavourite } = useContext(FavouritesContext)

  const isFavourite = favourites.some(
    (favouriteCity) => favouriteCity.id === id
  )

  return (
    <div className={style.city}>
      <div className={style.imageWrapper}>
        <img src={image?.urls.small} alt="" />
      </div>

      <div className={style.content}>
        <div className={style.spaceApart}>
          <h3>{name} </h3>
          {!isFavourite && (
            <FavouriteButton data={data} onClick={addFavourite} />
          )}
        </div>
        <p>Temp: {temp}&deg;C</p>
        {deleteable && <DeleteButton id={data.id} onClick={onDelete} />}
        <Link
          to={{
            pathname: name,
            state: data,
          }}
          className={style.stretchedLink}
        />
      </div>
    </div>
  )
}
