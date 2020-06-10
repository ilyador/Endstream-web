import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import board from '../game-data/board.json'
import game from '../game-data/new-game'
import Epoch from './Epoch'
import { DragDropContext } from 'react-beautiful-dnd'


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


const useStyles = createUseStyles(theme => ({
  board: {
    backgroundColor: theme.colorBackground,
    margin: [0, 'auto'],
    position: 'absolute',
    transformOrigin: 'top left',
    transition: 'all .2s ease-in-out',
    transform: zoom => zoom ? `scale(${zoom})` : 'none'
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
  },
  zoomButton: {
    position: 'absolute',
    zIndex: 5
  }
}))



export default function Board () {

  const boardElement = useRef(null)
  const [zoom, setZoom] = useState(null)
  const [board, setBoard] = useState(streams)
  const c = useStyles(zoom)


  const handleZoomChange = () => {
    if (!zoom) setZoom(getScale(boardElement.current))
    else setZoom(null)
  }

  const onDragEnd = result => {
    const { source, destination } = result

    if (!destination || (source.droppableId === destination.droppableId)) return

    const sourceDroppable = source.droppableId.split('-')
    const destinationDroppable = destination.droppableId.split('-')
    const _source = {
      epoch: sourceDroppable[0],
      type: sourceDroppable[1],
      streamOwner: sourceDroppable[2],
      owner: sourceDroppable[3],
    }
    const _destination = {
      epoch: destinationDroppable[0],
      type: destinationDroppable[1],
      streamOwner: destinationDroppable[2],
      owner: destinationDroppable[3],
    }

    console.log(_source, _destination)

    // let modifiedStream = board[_destination.streamOwner][_destination.epoch]
    // const [removed] = sourceClone.splice(droppableSource.index, 1)
    // console.log(modifiedStream)
  }


  return (
    <div className={c.board} ref={boardElement}>
      <DragDropContext onDragEnd={onDragEnd}>
        <button className={c.zoomButton} onClick={handleZoomChange}>ZOOM</button>

        {_streams.map(stream => (
          <div className={c[stream]} key={stream}>
            {_epochs.map(epoch =>
              <Epoch
                owner={IDs[stream]}
                turnpoint={board[IDs[stream]][epoch]}
                epoch={epoch}
                key={epoch}
              />
            )}
          </div>
        ))}
      </DragDropContext>
    </div>
  )
}
