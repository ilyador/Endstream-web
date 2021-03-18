import React from 'react'
import { createUseStyles } from 'react-jss'
import { Droppable } from "react-beautiful-dnd"
import deck from '../game-data/deck.json'
import Card from './Cards/Small'
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


export default function Epoch ({ epoch, turnpoint, owner, setCard }) {
  const c = useStyles()

  let positions = [
    {
      owner: IDs.opponent,
      type: 'hideouts',
      cards: turnpoint?.hideouts?.[IDs.opponent]
    },
    {
      owner: IDs.opponent,
      type: 'operators',
      cards: turnpoint?.operators?.[IDs.opponent]
    },
    {
      owner: IDs.me,
      type: 'operators',
      cards: turnpoint?.operators?.[IDs.me]
    },
    {
      owner: IDs.me,
      type: 'hideouts',
      cards: turnpoint?.hideouts?.[IDs.me]
    }
  ]


  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'none',
  })


  return (
    <div className={c.epoch}>
      {(owner === IDs.opponent) && <Agenda agenda={turnpoint.agenda} mine={false} />}

      {positions.map((position, index1) => {
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
            key={index1}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className={c[type]}
              >
                {cards && cards.map((card, index2) => {

                  let _card = deck[type].find(({ id }) => id === card)
                  _card.mine = card.player === IDs.me

                  return (
                    <Card
                      key={card}
                      index={index2}
                      player={position.owner}
                      data={_card}
                      setCard={setCard}
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
