import React from 'react'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
  agenda: {
    border: mine => (mine) ? '1px solid white' : '1px solid grey',
    marginTop: mine => (mine) ? 'auto' : 0,
    borderRadius: 6,
    flex: '0 0 50px',
    overflow: 'hidden',
    margin: [0, 4]
  }
})


export default function Agenda ({ agenda, mine }) {
  const c = useStyles(mine)

  return (
    <div className={c.agenda}>
      {agenda}
    </div>
  )
}
