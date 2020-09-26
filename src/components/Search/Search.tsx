import React, { useEffect, useState } from 'react'
import SRText from 'components/SRText'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import { useDebouncedValue } from 'hooks'
import { getCurrentWeather } from 'API'

import style from './search-box.module.css'
import Placeholder from 'components/Placeholder'
import { REQUEST_STATUSES } from 'models'
import CityPreview from 'components/CityPreview'

type Props = {
  labelText?: string
}

type changehandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export default function Search({ labelText = 'Search Cities' }: Props) {
  const [value, setValue] = useState<string>('')
  const [weather, setWeather] = useState<any>(null)
  const [status, setStatus] = useState<REQUEST_STATUSES>(REQUEST_STATUSES.IDLE)

  const debouncedValue = useDebouncedValue(value, 500)

  useEffect(() => {
    if (debouncedValue) {
      setStatus(REQUEST_STATUSES.LOADING)
      getCurrentWeather({ q: debouncedValue })
        .then((data) => {
          setWeather(data)
          setStatus(REQUEST_STATUSES.SUCCESS)
        })
        .catch(() => setStatus(REQUEST_STATUSES.ERROR))
    }
  }, [debouncedValue])

  const onChange: changehandler = (event) => {
    setValue(event.target.value)
  }

  return (
    <section>
      <div className={style.searchContainer}>
        <label htmlFor="search" className={style.label}>
          <SearchIcon
            className={style.searchIcon}
            focusable="false"
            aria-hidden="true"
          />
          <SRText>{labelText}</SRText>
        </label>
        <input
          type="text"
          inputMode="search"
          value={value}
          id="search"
          onChange={onChange}
          className={style.searchInput}
          placeholder={labelText}
        />
      </div>
      <div>
        <Placeholder status={status} />
        <div className={style.grid}>
          {weather && <CityPreview data={weather} deleteable={false} />}
        </div>
      </div>
    </section>
  )
}
