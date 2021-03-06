import { useState, useEffect } from "react"
import axios from "axios"

const baseApiUrl = "https://localhost:44307/account"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    if (accessToken) return

    axios
      .post(`${baseApiUrl}/login`, {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/dashboard")
      })
      .catch((error) => {
        console.log(error)
        window.location = "/"
      })
  }, [code]) // run useEfect everytime 'code' changes

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    const interval = setInterval(() => {
      axios
        .post(`${baseApiUrl}/refresh`, {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch((error) => {
          console.log(error)
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    // returning a function within the useEffect Hook specifies how to "Clean Up" after
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}