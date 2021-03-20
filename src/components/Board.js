import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { DragDropContext } from 'react-beautiful-dnd'
import { cloneDeep as _cloneDeep, set as _set } from 'lodash-es'
import board from '../game-data/board.json'
import game from '../game-data/new-game'
import Epoch from './Epoch'
import Card from './Cards/Big'


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
  const [displayedCard, setDisplayedCard] = useState(null)
  const [board, setBoard] = useState(streams)
  const c = useStyles(zoom)


  const handleZoomChange = () => {
    if (!zoom) setZoom(getScale(boardElement.current))
    else setZoom(null)
  }

  const onDragEnd = result => {
    const { source, destination } = result

    const sourceDroppable = source.droppableId.split('-')
    const destinationDroppable = destination.droppableId.split('-')
    const _source = {
      epoch: sourceDroppable[0],
      type: sourceDroppable[1],
      streamOwner: sourceDroppable[2],
      owner: sourceDroppable[3]
    }
    const _destination = {
      epoch: destinationDroppable[0],
      type: destinationDroppable[1],
      streamOwner: destinationDroppable[2],
      owner: destinationDroppable[3]
    }


    if (
      !destination ||
      (source.droppableId === destination.droppableId) ||
      _source.type !== _destination.type ||
      _source.owner !== _destination.owner
    ) return



    let destinationEpoch = _cloneDeep(board[_destination.streamOwner][_destination.epoch])
    let sourceEpoch = _cloneDeep(board[_source.streamOwner][_source.epoch])

    const [removed] = sourceEpoch[_source.type][_source.owner].splice(source.index, 1)

    if (destinationEpoch[_destination.type]) {
      destinationEpoch[_destination.type][_destination.owner].splice(destination.index, 0, removed)
    } else {
      _set(destinationEpoch, [_destination.type, _destination.owner, 0], removed)
    }


    setBoard(originalBoard => {
      let newBoard = {}

      if (_source.streamOwner === _destination.streamOwner) {
        newBoard = {
          ...originalBoard,
          [_destination.streamOwner]: {
            ...originalBoard[_destination.streamOwner],
            [_source.epoch]: sourceEpoch,
            [_destination.epoch]: destinationEpoch
          }
        }
      } else {
        newBoard = {
          ...originalBoard,
          [_destination.streamOwner]: {
            ...originalBoard[_destination.streamOwner],
            [_destination.epoch]: destinationEpoch
          },
          [_source.streamOwner]: {
            ...originalBoard[_source.streamOwner],
            [_source.epoch]: sourceEpoch
          }
        }
      }

      return newBoard
    })
  }

  return (
    <div className={c.board} ref={boardElement}>
      <button className={c.zoomButton} onClick={handleZoomChange}>ZOOM</button>
      {displayedCard && <Card data={displayedCard} setCard={setDisplayedCard}/>}

      <DragDropContext onDragEnd={onDragEnd}>
        {_streams.map(stream => (
          <div className={c[stream]} key={stream}>
            {_epochs.map(epoch =>
              <Epoch
                owner={IDs[stream]}
                turnpoint={board[IDs[stream]][epoch]}
                epoch={epoch}
                setCard={setDisplayedCard}
                key={epoch}
              />
            )}
          </div>
        ))}
      </DragDropContext>
    </div>
  )
}
