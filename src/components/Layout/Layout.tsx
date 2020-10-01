import React, { useEffect, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useLocation, useLocationWeather } from 'hooks'
import { REQUEST_STATUSES } from 'types'

import Container from 'components/Container'

import style from './layout.module.css'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { status, weather } = useLocationWeather(useLocation())
  const history = useHistory()

  useEffect(() => {
    if (status === REQUEST_STATUSES.SUCCESS && weather) {
      if (
        window.confirm('Would you like to see the weather in your location?')
      ) {
        history.push(`/${weather.name}`, weather)
      }
    }
  }, [status, weather?.id])

  return (
    <div className={style.page}>
      <Container>
        <header className={`${style.header} ${weather ? style.withInfo : ''}`}>
          <Link to="/">Weather App</Link>
          {weather && (
            <Link
              to={{
                pathname: weather.name,
                state: weather,
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
