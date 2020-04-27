import React, { useEffect } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { illustrations } from './load-images'


const useStyles = createUseStyles(theme => ({
  board: {
    backgroundColor: theme.colorPrimary,
    color: theme.textColor,
    height: '100%'
  }
}))



export default function Board () {
  const theme = useTheme()
  const c = useStyles({ theme })

  return (
    <div className={c.board}>
      Board

      <img src={illustrations['big/Mori-the-Piercer']} alt="Mori" />
    </div>
  )
}
