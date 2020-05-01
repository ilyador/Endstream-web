import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { illustrations } from '../../helpers/load-images'


const useStyles = createUseStyles({
  card: {
    border: '1px solid grey',
    borderRadius: 6,
    overflow: 'hidden'
  },
  name: {
    fontSize: 10,
    textAlign: 'center'
  },
  img: {

  }
})


export default function Card ({ type: cardType, data }) {
  const c = useStyles()

  return (
    <div className={c.card}>
      <div className={c.name}>{data.name}</div>
      <img className={c.img} src={illustrations[`small/${data.id}`]} alt={data.id}/>
    </div>
  )
}
