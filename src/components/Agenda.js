import React from 'react'
import { createUseStyles } from 'react-jss'
import { UI } from '../helpers/load-images'


const useStyles = createUseStyles({
  agenda: {
    border: mine => (mine) ? '1px solid white' : '1px solid grey',
    marginTop: mine => (mine) ? 'auto' : 0,
    position: 'relative',
    flex: '0 0 50px',
    margin: [0, 4],
    overflow: 'hidden',
    borderRadius: 6
  },
  top: {
    height: '100%',
    padding: 10,
    margin: '0 auto'
  },
  back: {
    height: '30%',
    position: 'absolute',
    right: 6,
    top: 6
  }
})


function getImgSrc(agenda) {
  if (agenda === "m") return UI['agenda-military']
  if (agenda === "p") return UI['agenda-science']
  if (agenda === "s") return UI['agenda-politic']
}


export default function Agenda ({ agenda, mine }) {
  const c = useStyles(mine)

  return (
    <div className={c.agenda}>
      <img className={c.top} src={getImgSrc(agenda[0])} alt="agenda"/>
      <img className={c.back} src={getImgSrc(agenda[1])} alt="agenda"/>
    </div>
  )
}
