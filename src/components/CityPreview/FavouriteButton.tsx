import React from 'react'
import style from './city-preview.module.css'
import { clickHandlerType } from 'models/types'

type FavouriteProps = {
  data: any
  onClick: (data: string) => void
}

export default function FavouriteButton({ data, onClick }: FavouriteProps) {
  const handleClick: clickHandlerType = (event) => onClick(data)
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
