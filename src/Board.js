import React, { useEffect } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import board from './game-data/board.json'
import { illustrations } from './load-images'


const useStyles = createUseStyles(theme => ({
  board: {

  },
  stream: {
    display: 'flex'
  },
  epoch: {
    border: '1px solid gray'
  },
}))


const { epochs, streams } = board


export default function Board () {
  const theme = useTheme()
  const c = useStyles({ theme })

  return (
    <div className={c.board}>
      {/*<img src={illustrations['big/Mori-the-Piercer']} alt="Mori" />*/}
      {streams.map(stream =>
        <div className={c.stream} key={stream}>
          {epochs.map(epoch =>
            <div className={c.epoch} key={epoch}>{epoch}</div>
          )}
        </div>
      )}
    </div>
  )
}
