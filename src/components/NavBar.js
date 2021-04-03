import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaSearch, FaMusic, FaSpotify } from 'react-icons/fa';
import SpotifyWebApi from "spotify-web-api-node"

import { isAuthenticated } from "../services/auth"

const spotifyApi = new SpotifyWebApi({
    clientId: "a96d0cad3491467e9795d6e0513fe801",
})

export default function NavBar() {
    const [accessToken, setToken] = useState();
    const [playLists, setPlayLists] = useState([])
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        if (accessToken) return

        var token = isAuthenticated()
        if (token) {
            setToken(token)
            spotifyApi.setAccessToken(token)
        }

    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return

        if (!currentUser) {
            getSpotifyUser()
        }

        if (currentUser && playLists.length === 0) {
            getPlaylists()
        }
    }, [accessToken, currentUser])

    function getSpotifyUser() {
        spotifyApi.getMe()
            .then(res => {
                setCurrentUser(res.body)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getPlaylists() {
        spotifyApi.getUserPlaylists(currentUser.id)
            .then(res => {
                setPlayLists(res.body.items)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <Link class="nav-link active" to="/dashboard">
                        <FaTachometerAlt className="icon" />
                        Dashboard <span class="sr-only">(current)</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/search">
                        <FaSearch className="icon" />
                        Search <span class="sr-only">(current)</span>
                    </Link >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <FaMusic className="icon" />
                        My Library <span class="sr-only">(current)</span>
                    </a>
                </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Playlists</span>
                <a class="d-flex align-items-center text-muted" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
               </a>
            </h6>
            <ul class="nav flex-column mb-2">
                {playLists.map(playlist => (
                    <li class="nav-item" key={playlist.id}>
                        <a class="nav-link" href="#" >
                            {playlist.name} <span class="sr-only"></span>
                        </a>
                    </li>
                ))}
            </ul>
      </div>
    )
}