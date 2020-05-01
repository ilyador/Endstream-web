import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import deck from '../game-data/deck.json'
import Card from './Cards/Small'


const { operators, hideouts } = deck


const useStyles = createUseStyles({
  epoch: {
    display: 'inline-block',
    width: 130,
    border: '1px solid black'
  }
})


export default function Epoch ({ epoch: _epoch }) {
  const theme = useTheme()
  const c = useStyles({ theme })

  let _operators = _epoch && _epoch.operators
  let _hideouts = _epoch && _epoch.hideouts

  return (
    <div className={c.epoch}>
      {_operators && _operators.map(_operator => {
        const operator = operators.find(({ id }) => id === _operator.id)
        return <Card key={operator.id} data={operator} type='operator'/>
      })}
      {_hideouts && _hideouts.map(_hideout => {
        const hideout = hideouts.find(({ id }) => id === _hideout.id)
        return <Card key={hideout.id} data={hideout} type='hideout'/>
      })}
    </div>
  )
}
