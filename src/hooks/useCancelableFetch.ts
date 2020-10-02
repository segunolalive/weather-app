import { getImage } from 'API'
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react'

import { REQUEST_STATUSES } from 'types'

interface IwithImage {
  image?: any
}

export function useCancelableFetch<T>(url: string | null) {
  const [status, setStatus] = useState(REQUEST_STATUSES.IDLE)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string>('')
  const abortRef: MutableRefObject<any> = useRef(null)

  const makeRequest = useCallback(
    async function (signal: AbortSignal) {
      if (url) {
        setStatus(REQUEST_STATUSES.LOADING)
        try {
          const response = await fetch(url, { signal })
          if (!response.ok) {
            const data = await response.json()
            throw new Error(data?.message || 'Aww, snap! We messed up')
          }
          const jsonData = await response.json()

          setStatus(REQUEST_STATUSES.SUCCESS)
          setData(jsonData)
        } catch (error) {
          console.log({error});
          if (!signal.aborted) {
            setStatus(REQUEST_STATUSES.ERROR)
            setError(error.message)
          }
        }
      }
    },
    [url]
  )

  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller

    makeRequest(controller.signal)
    return () => {
      controller.abort()
    }
  }, [url, makeRequest])

  return { status, data, error }
}
