import React, { useContext } from 'react'
import { cityWeatherType, REQUEST_STATUSES } from 'types'
import Placeholder from 'components/Placeholder'
import FavouritesContext from 'Contexts/FavouritesContext'
import FavouriteButton from 'components/CityPreview/FavouriteButton'

import style from './city-detail.module.css'

type CityDetailProps = {
  weatherInfo: cityWeatherType
  status: REQUEST_STATUSES
}

export default function CityDetail({ weatherInfo, status }: CityDetailProps) {
  const { favourites, addFavourite } = useContext(FavouritesContext)
  const isFavourite = favourites.some(
    (favouriteCity) => favouriteCity.id === weatherInfo?.id
  )

  if (weatherInfo) {
    const {
      image,
      name,
      main,
      wind,
      visibility,
      clouds,
      rain,
      weather,
    } = weatherInfo
    return (
      <section className={style.page}>
        <img
          className={style.img}
          src={image?.urls?.regular}
          alt=""
          height="200px"
          width="200px"
        />
        <div className={style.container}>
          {!isFavourite && (
            <div className={style.favourite}>
              <FavouriteButton data={weatherInfo} onClick={addFavourite} />
            </div>
          )}
          <h1 className={style.heading}>{name}</h1>
          <h2>Temperature</h2>
          <p>
            Description: <strong>{weather[0]?.description}</strong>{' '}
          </p>
          <p>
            Temperature: <strong>{main.temp}&deg;C</strong>{' '}
          </p>
          <p>
            Feels Like: <strong>{main.feels_like}&deg;C</strong>{' '}
          </p>
          <h2>Wind</h2>
          <p>
            Wind Speed: <strong>{wind.speed}m/s</strong>{' '}
          </p>
          <p>
            Wind Degree: <strong>{wind.deg}&deg;</strong>{' '}
          </p>
          <h2>Others</h2>
          <p>
            Pressure: <strong>{main.pressure}hPa</strong>{' '}
          </p>
          {rain?.['1h'] && (
            <p>
              Rain (1hr): <strong>{rain['1h']}mm</strong>{' '}
            </p>
          )}
          <p>
            Humidity: <strong>{main.humidity}%</strong>{' '}
          </p>
          <p>
            Cloudcover: <strong>{clouds.all}%</strong>{' '}
          </p>
          <p>
            Visibility: <strong>{visibility} km</strong>{' '}
          </p>
        </div>
      </section>
    )
  } else {
    return (
      <div className={style.center}>
        <Placeholder status={status} />
      </div>
    )
  }
}
