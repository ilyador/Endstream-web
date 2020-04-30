import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import deck from '../game-data/deck.json'
import { illustrations } from '../helpers/load-images'


const useStyles = createUseStyles(theme => ({
  deck: {

  },
  card :{

  }
}))


export default function Board () {
  const theme = useTheme()
  const c = useStyles({ theme })

  return (
    <div className={c.deck}>

    </div>
  )
}
