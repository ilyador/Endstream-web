import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import board from '../game-data/board.json'
import game from '../game-data/new-game'
import Epoch from './Epoch'


const IDs = {
  me: 'player1',
  opponent: 'player2',
  outerworld: 'outerworld'
}


const { epochs: _epochs, streams: _streams } = board
const { streams } = game


function getScale (element) {
  let width = element.offsetWidth
  let height = element.offsetHeight
  let windowWidth = document.body.clientWidth
  let windowHeight = document.body.clientHeight
  return Math.min(windowWidth / width, windowHeight / height)
}


const useStyles = createUseStyles({
  board: {
    margin: [0, 'auto'],
    position: 'absolute',
    transformOrigin: 'top left',
    transition: 'all .2s ease-in-out',
    transform: zoom => `scale(${zoom})`
  },
  stream: {
    display: 'flex'
  },
  me: {
    extend: 'stream'
  },
  opponent: {
    extend: 'stream'
  },
  outerworld: {
    extend: 'stream'
  }
})



export default function Board () {

  const boardElement = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [board, setBoard] = useState(streams)
  const c = useStyles(zoom)


  const handleZoomChange = () => {
    if (zoom === 1) setZoom(getScale(boardElement.current))
    else setZoom(1)
  }


  return (
    <div className={c.board} ref={boardElement}>
      <button onClick={handleZoomChange}>ZOOM</button>

      {_streams.map(stream => (
        <div className={c[stream]} key={stream}>
          {_epochs.map(epoch =>
            <Epoch
              owner={stream}
              epoch={board[IDs[stream]][epoch]}
              key={epoch}
            />
          )}
        </div>
      ))}
    </div>
  )
}
