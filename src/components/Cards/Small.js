import React from 'react'
import { createUseStyles } from 'react-jss'
import { illustrations } from '../../helpers/load-images'


const useStyles = createUseStyles({
  card: {
    border: mine => (mine) ? '1px solid white' : '1px solid grey',
    borderRadius: 6,
    flex: '0 1 35%',
    overflow: 'hidden',
    margin: [0, 4]
  },
  name: {
    fontSize: 10,
    textAlign: 'center'
  },
  img: {

  }
})


export default function Card ({ type: cardType, data }) {
  const { id, name, mine } = data
  const c = useStyles(mine)

  return (
    <div className={c.card}>
      <div className={c.name}>{name}</div>
      <img className={c.img} src={illustrations[`small/${id}`]} alt={id}/>
    </div>
  )
}
