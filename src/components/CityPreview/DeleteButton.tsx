import React from 'react'
import style from './city-preview.module.css'
import { clickHandlerType } from 'models/types'

type DeleteProps = {
  id: number
  onClick: (id: number) => void
}

export default function DeleteButton({ id, onClick }: DeleteProps) {
  const handleClick: clickHandlerType = () => onClick(id)
  return (
    <button className={style.cancel} aria-label="remove" onClick={handleClick}>
      <span className={style.wrapper}>
        <span className={style.span} role="img" aria-hidden="true">
          &times;
        </span>
      </span>
    </button>
  )
}
