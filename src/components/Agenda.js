import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { UIimages } from '../helpers/load-images'


const useStyles = createUseStyles(theme => ({
  agenda: {
    border: mine => (mine) ? '1px solid white' : '1px solid grey',
    marginTop: mine => (mine) ? 'auto' : 0,
    backgroundColor: theme.colorPrimary,
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
}))


function getImgSrc(agenda) {
  switch (agenda) {
    case 'm': return UIimages['agenda-military']
    case 'p': return UIimages['agenda-politic']
    case 's': return UIimages['agenda-science']
  }
}


export default function Agenda ({ agenda: _agenda, mine }) {
  const c = useStyles(mine)
  const [agenda, setAgenda] = useState(Array.from(_agenda))


  const spinAgenda = () => {
    let spun = Array.from(agenda).reverse()
    setAgenda(spun)
  }

  return (
    <div className={c.agenda} onClick={spinAgenda}>
      <img className={c.top} src={getImgSrc(agenda[0])} alt="agenda"/>
      <img className={c.back} src={getImgSrc(agenda[1])} alt="agenda"/>
    </div>
  )
}
