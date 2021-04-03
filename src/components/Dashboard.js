import { React, useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import useAuth from "../hooks/useAuth"

import NavBar from "./NavBar"

// const spotifyApi = new SpotifyWebApi({
//     clientId: "a96d0cad3491467e9795d6e0513fe801",
// })

export default function Dashboard({token}) {
    // const [accessToken, setaccessToken] = useState(token)

    // useEffect(() => {
    //     if (!accessToken) return
    //     spotifyApi.setAccessToken(accessToken)
    // }, [accessToken])

    return (
        <div>Dashboard</div>
    )
}