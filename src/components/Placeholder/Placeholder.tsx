import React from 'react'
import { REQUEST_STATUSES } from 'types'
import style from './placeholder.module.css'

type plaholderProp = {
  status: REQUEST_STATUSES
  ErrorMessage?: string
}

export default function Placeholder({
  status,
  ErrorMessage = '',
}: plaholderProp) {
  if (status === REQUEST_STATUSES.LOADING) {
    return <div>... L O A D I N G ... </div>
  }
  if (status === REQUEST_STATUSES.ERROR) {
    return <div className={style.error}>An Error Occured! {ErrorMessage} </div>
  }
  return null
}
