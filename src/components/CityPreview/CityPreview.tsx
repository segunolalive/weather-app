import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'
import FavouriteButton from './FavouriteButton'
import style from './city-preview.module.css'

type cityProp = {
  data: any
  onFavorite?: (id: string) => void
  onDelete?: (city: any) => void
  isFavourite?: boolean
  deletable?: boolean
}

export default function CityPreview({
  data,
  onFavorite = () => {},
  onDelete = () => {},
  isFavourite = false,
  deletable = true,
}: cityProp) {
  const { current, location, image } = data

  return (
    <div className={style.city}>
      <img src={image?.urls?.thumb} alt="" />
      <div className={style.spaceApart}>
        <h3>{location.name} </h3>
        {!isFavourite && <FavouriteButton data={data} onClick={onFavorite} />}
      </div>
      <p>Temp: {current.temperature}&deg;C</p>
      {deletable && <DeleteButton data={data} onClick={onDelete} />}
      <Link
        to={{
          pathname: `${location.name}`,
          state: data,
        }}
        className={style.stretchedLink}
      />
    </div>
  )
}
