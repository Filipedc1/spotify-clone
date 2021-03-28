import { React, useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import TrackSearchResult from "./TrackSearchResult"
import Player from "./Player"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
    clientId: "a96d0cad3491467e9795d6e0513fe801",
  })

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!playingTrack) return
    
        getLyrics()
      }, [playingTrack])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
    
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return

            var data = getSearchResults(res.body.tracks.items)
            setSearchResults(data)
        })
    
        return () => (cancel = true)
    }, [search, accessToken])

    function getSearchResults(tracks) {
        return tracks.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                },
                track.album.images[0]
            )
    
            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
            }
        })
    }

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
    }

    function getLyrics() {
        axios
        .get(`https://localhost:44307/music/lyrics/${playingTrack.artist}/${playingTrack.title}`)
        .then(res => {
          setLyrics(res.data)
        })
        .catch((error) => {
            setLyrics("No Lyrics")
            console.log(error)
        })
    }

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.map(track => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack}
                    />
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: "pre" }}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </Container>
    )
}