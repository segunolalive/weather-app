import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Layout from 'components/Layout'

type CityProps = {
  location: any
}

export default function City({ location }: RouteComponentProps) {
  return (
    <Layout>
      {/* <img src={image?.urls.regular} alt="" />
      <h1>{location?.name}</h1>
      <h2>Temperature</h2>
      <p>Description: {current.weather_descriptions.join(', ')}</p>
      <p>Temperature: {current.temperature}&deg;C </p>
      <p>Feels Like: {current.feels_like}&deg;C </p>
      <h2>Wind</h2>
      <p>Wind Direction: {current.wind_dir}</p>
      <p>Wind Speed: {current.wind_speed} Km/hr</p>
      <p>Wind Degree: {current.wind_degree}</p>
      <h2>Others</h2>
      <p>{current.pressure}
      <p>{current.precip} millimeters</p>
      <p>{current.humidity}%</p> 
      <p>{current.cloudcover}%</p>
      <p>{current.uv_index}</p> 
      <p>{current.visibility} km</p> */}
    </Layout>
  )
}
