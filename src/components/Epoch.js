import React from 'react'
import { createUseStyles } from 'react-jss'
import { Droppable } from "react-beautiful-dnd"
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


const useStyles = createUseStyles(theme => ({
  epoch: {
    width: '50vw',
    border: `1px solid ${theme.colorPrimary}`,
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
    flex: '1 0',
    justifyContent: 'center',
    margin: [8, 0],
  },
  operators: {
    extend: 'type'
  },
  hideouts: {
    extend: 'type'
  }
}))


export default function Epoch ({ epoch, turnpoint, owner }) {
  const c = useStyles()

  let _operators = turnpoint && _groupBy(turnpoint.operators, op => op.player === IDs.me)
  let _hideouts = turnpoint && _groupBy(turnpoint.hideouts, ho => ho.player === IDs.me)


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


  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'none',
  })


  return (
    <div className={c.epoch}>
      {(owner === IDs.opponent) && <Agenda agenda={turnpoint.agenda} mine={false} />}

      {positions.map((position, index) => {
        const { owner: _owner, type, cards } = position

        if ( // Remove the option to drag hideout into opponent's stream
          type === 'hideouts' && (
            (_owner !== owner && owner === IDs.me) ||
            (_owner !== owner && owner === IDs.opponent)
          )
        ) return null;


        return (
          <Droppable
            direction="horizontal"
            droppableId={epoch + '-' + type + '-' + owner + '-' + _owner}
            key={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className={c[type]}
              >
                {cards && cards.map((card, index2) => {

                  let _card = deck[type].find(({ id }) => id === card.id)
                  _card.mine = card.player === IDs.me

                  return (
                    <Card
                      key={card.id}
                      index={index2}
                      player={card.player}
                      data={_card}
                      type={type}
                    />
                  )
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )
      })}

      {(owner === IDs.me) && <Agenda agenda={turnpoint.agenda} mine={true} />}
    </div>
  )
}
