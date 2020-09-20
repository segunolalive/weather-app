import React from 'react'
import { REQUEST_STATUSES } from 'models'

type plaholderProp = {
  status: REQUEST_STATUSES
  ErrorMessage?: string
}

export default function Placeholder({ status, ErrorMessage = '' }: plaholderProp) {
  if (status === REQUEST_STATUSES.LOADING) {
    return <div>... L O A D I N G ... </div>
  }
  if (status === REQUEST_STATUSES.ERROR) {
    return <div>An Error Occured. {ErrorMessage} </div>
  }
  return null
}
