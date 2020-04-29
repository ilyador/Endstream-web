import React, { useState } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import board from './game-data/board.json'
import game from './game-data/new-game.js'
import { illustrations } from './load-images'


const IDs = {
  me: 'player1',
  opponent: 'player2',
  outerworld: 'outerworld'
}
const { epochs, streams: _streams } = board
const { streams } = game


const useStyles = createUseStyles((theme) => ({
  board: {},
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
    extend: 'stream',
  },
  epoch: {
    flex: 1,
    border: '1px solid gray'
  }
}))


export default function Board () {

  const theme = useTheme()
  const c = useStyles({ theme })


  return (
    <div className={c.board}>
      {_streams.map(stream => {
        let playerStream = streams[IDs[stream]]

        return (
          <div className={c[stream]} key={stream}>
            {epochs.map(epoch => {
              let _epoch = playerStream[epoch]
              let operators = _epoch && _epoch.operators
              let hideouts = _epoch && _epoch.hideouts

              return (
                <div className={c.epoch} key={epoch}>
                  {operators && operators.map(operator =>
                    <div key={operator}>{operator[1]}</div>
                  )}
                  {hideouts && hideouts.map(hideouts =>
                    <div key={hideouts}>{hideouts[1]}</div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// <img src={illustrations[`big/${id}`]} alt={id}} />
