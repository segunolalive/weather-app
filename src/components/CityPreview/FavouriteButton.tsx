import React from 'react'
import style from './city-preview.module.css'
import { cityWeatherType, clickHandlerType } from 'types'

type FavouriteProps = {
  data: cityWeatherType
  onClick: (data: cityWeatherType) => void
}

export default function FavouriteButton({ data, onClick }: FavouriteProps) {
  const handleClick: clickHandlerType = () => onClick(data)
  return (
    <button
      className={style.favorite}
      aria-label="add to favorites"
      onClick={handleClick}
    >
      <span role="img" aria-hidden="true">
        ❤️
      </span>
    </button>
  )
}
