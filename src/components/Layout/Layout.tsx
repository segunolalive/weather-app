import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'components/Container'

import style from './layout.module.css'
import { cityWeatherType } from 'types'

type Props = {
  info?: cityWeatherType | null
  children: React.ReactNode
}

export default function Layout({ info, children }: Props) {
  return (
    <div className={style.page}>
      <Container>
        <header className={`${style.header} ${info ? style.withInfo : ''}`}>
          <Link to="/">Weather App</Link>
          {info && (
            <Link
              to={{
                pathname: info.name,
                state: info,
              }}
            >
              My Location
            </Link>
          )}
        </header>
      </Container>
      <main className={style.main}>
        <Container className={style.container}>{children}</Container>
      </main>
      <Container>
        <footer className={style.footer}>
          <div>
            Built with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            and{' '}
            <span role="img" aria-label="coffee">
              ☕️
            </span>{' '}
          </div>
        </footer>
      </Container>
    </div>
  )
}
