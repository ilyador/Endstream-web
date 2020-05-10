import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { createUseStyles } from 'react-jss'
import { illustrations } from '../../helpers/load-images'


const useStyles = createUseStyles(theme => ({
  card: {
    border: mine => (mine) ? '1px solid white' : '1px solid grey',
    backgroundColor: theme.colorPrimary,
    borderRadius: 6,
    flex: '0 1 35%',
    overflow: 'hidden',
    margin: [0, 4],
    transformOrigin: 'top left',
    transition: 'all .2s ease-in-out'
  },
  name: {
    fontSize: 10,
    textAlign: 'center'
  },
  img: {

  }
}))


export default function Card ({ type: cardType, data, player, index }) {
  const { id, name, mine } = data
  const c = useStyles(mine)


  const getItemStyle = (isDragging, draggableStyle) => ({
    // zoom: isDragging ? 1.3 : 1,

    ...draggableStyle
  })


  return (
    <Draggable draggableId={player + '-' + id} index={index}>
      {(provided, snapshot) => (
        <div
          className={c.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div className={c.name}>{name}</div>
          <img className={c.img} src={illustrations[`small/${id}`]} alt={id}/>
        </div>
      )}
    </Draggable>
  )
}
