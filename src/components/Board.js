import React, { useState } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import board from '../game-data/board.json'
import deck from '../game-data/deck.json'
import game from '../game-data/new-game.js'
import { illustrations } from '../helpers/load-images'


const IDs = {
  me: 'player1',
  opponent: 'player2',
  outerworld: 'outerworld'
}

const { operators, hideouts } = deck
const { epochs: _epochs, streams: _streams } = board
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
    border: '1px solid gray',
    fontSize: 10
  }
}))


export default function Board () {

  const [board, setBoard] = useState(streams)
  const theme = useTheme()
  const c = useStyles({ theme })


  return (
    <div className={c.board}>
      {_streams.map(stream => {
        let playerStream = board[IDs[stream]]

        return (
          <div className={c[stream]} key={stream}>
            {_epochs.map(epoch => {
              let _epoch = playerStream[epoch]
              let _operators = _epoch && _epoch.operators
              let _hideouts = _epoch && _epoch.hideouts

              return (
                <div className={c.epoch} key={epoch}>
                  {_operators && _operators.map(_operator => {
                    const operator = operators.find(({ id }) => id === _operator.id )

                    return (
                      <div key={_operator.id}>
                        {operator.name}
                        <img src={illustrations[`small/${_operator.id}`]} alt={_operator.id}/>
                      </div>
                    )
                  })}
                  {_hideouts && _hideouts.map(_hideout => {
                    const hideout = hideouts.find(({ id }) => id === _hideout.id )

                    return (
                      <div key={_hideout.id}>
                        {hideout.name}
                        <img src={illustrations[`small/${_hideout.id}`]} alt={_hideout.id}/>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
