import React from 'react'
import style from './city-preview.module.css'
import { clickHandlerType } from 'models/types'

type DeleteProps = {
  data: any
  onClick: (data: any) => void
}

export default function DeleteButton({ data, onClick }: DeleteProps) {
  const handleClick: clickHandlerType = (event) => onClick(data)
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
