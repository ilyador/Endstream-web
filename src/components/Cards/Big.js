import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { illustrations } from '../../helpers/load-images'


const useStyles = createUseStyles(theme => ({
  card: {

  }
}))


export default function Card ({ type, data }) {
  const theme = useTheme()
  const c = useStyles({ theme })

  return (
    <div className={c.card}>

    </div>
  )
}
