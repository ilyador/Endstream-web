import React from 'react'
import { createUseStyles } from 'react-jss'
import deck from '../game-data/deck.json'
import Card from './Cards/Small'
import { groupBy as _groupBy } from 'lodash-es'
import Agenda from './Agenda'

const IDs = {
  me: 'player1',
  opponent: 'player2',
  outerworld: 'outerworld'
}


const mobileSize = 600
const tabletSize = 1000


const useStyles = createUseStyles({
  epoch: {
    width: '50vw',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column'
  },
  [`@media (min-width: ${mobileSize}px)`]: {
    epoch: {
      width: '33.3333vw'
    }
  },
  [`@media (min-width: ${tabletSize}px)`]: {
    epoch: {
      flex: 1,
      width: 'auto'
    }
  },
  type: {
    display: 'flex',
    justifyContent: 'center',
    margin: [8, 0],
  },
  operators: {
    extend: 'type'
  },
  hideouts: {
    extend: 'type'
  }
})


export default function Epoch ({ epoch, owner }) {
  const c = useStyles()

  let _operators = epoch && _groupBy(epoch.operators, op => op.player === IDs.me)
  let _hideouts = epoch && _groupBy(epoch.hideouts, ho => ho.player === IDs.me)


  let positions = [
    {
      owner: IDs.opponent,
      type: 'hideouts',
      cards: _hideouts && _hideouts['false']
    },
    {
      owner: IDs.opponent,
      type: 'operators',
      cards: _operators && _operators['false']
    },
    {
      owner: IDs.me,
      type: 'operators',
      cards: _operators && _operators['true']
    },
    {
      owner: IDs.me,
      type: 'hideouts',
      cards: _hideouts && _hideouts['true']
    }
  ]


  return (
    <div className={c.epoch}>
      {(owner === IDs.opponent) && <Agenda agenda={epoch.agenda} mine={false} />}

      {positions.map((position, index) => {
        const { owner, type, cards } = position

        return (
          <div className={c[type]} key={index}>
            {cards && cards.map(card => {

              let _card = deck[type].find(({ id }) => id === card.id)
              _card.mine = card.player === IDs.me

              return (
                <Card
                  key={card.id}
                  data={_card}
                  type={type}
                />
              )
            })}
          </div>
        )
      })}

      {(owner === IDs.me) && <Agenda agenda={epoch.agenda} mine={true} />}
    </div>
  )
}
