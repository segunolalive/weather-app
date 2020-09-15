import * as React from 'react'

import SRText from 'components/SRText'

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'

import style from './search-box.module.css'

type Props = {
  value?: string
  labelText?: string
  searchFn: (text: string) => void
}

type changehandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export default function SearchBox({ value = '', labelText = 'Search Cities', searchFn }: Props) {
  const onChange: changehandler = (event) => {
    searchFn(event.target.value)
  }

  return (
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
  )
}
