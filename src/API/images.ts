import Axios from 'axios'

export const API = Axios.create({
  baseURL: process.env.REACT_APP_PHOTOS_BASE_URL,
  timeout: 3000,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_PHOTOS_ACCESS_KEY}`,
  },
})

export async function getImage(query: string, pageSize = 1) {
  try {
    const { data } = await API.get(
      `/?page=1&query=${query}&per_page=${pageSize}`
    )
    return data
  } catch (error) {
    console.log(error)
  }
}
