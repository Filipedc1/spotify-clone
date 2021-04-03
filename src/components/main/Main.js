import { React, useState, useEffect } from 'react'
import { Container } from "react-bootstrap"
import './Main.css'

import SpotifyWebApi from "spotify-web-api-node"
import Routes from '../../Routes';
import NavBar from "../NavBar"

import { loginAsync, isAuthenticated } from "../../services/auth"

const spotifyApi = new SpotifyWebApi({
    clientId: "a96d0cad3491467e9795d6e0513fe801",
})

export default function Main(props) {
    const [accessToken, setToken] = useState();

    async function getToken(code) {
        let token = isAuthenticated()
        if (token) {
            setToken(token)
        }
        else {
            let res = await loginAsync(code)
            if (res) {
                setToken(res)
                spotifyApi.setAccessToken(accessToken)
            }
        }
    }

    useEffect(() => {
        if (accessToken) return

        getToken(props.code)
    }, [accessToken])

    
    return (
        <Container fluid>
            {accessToken &&
                <div className="row">
                    <div className="col-md-2 d-none d-md-block bg-dark sidebar">
                        <NavBar /> 
                    </div>
                    <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <Routes />
                    </div>
                </div>
            }
        </Container>
    )
}