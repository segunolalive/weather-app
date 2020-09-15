import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react'

import { REQUEST_STATUSES } from 'models'

export function useData(url: string) {
  const [status, setStatus] = useState(REQUEST_STATUSES.IDLE)
  const [data, setData] = useState([])
  const abortRef: MutableRefObject<any> = useRef(null)

  const makeRequest = useCallback(
    async function (signal: AbortSignal) {
      setStatus(REQUEST_STATUSES.LOADING)
      try {
        const response = await fetch(url, { signal })
        if (!response.ok) {
          throw new Error('Server Error')
        }
        const jsonData = await response.json()
        setStatus(REQUEST_STATUSES.SUCCESS)
        setData(jsonData)
      } catch (error) {
        if (!signal.aborted) {
          setStatus(REQUEST_STATUSES.ERROR)
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

  return { status, data }
}
