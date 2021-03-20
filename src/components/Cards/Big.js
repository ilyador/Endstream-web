import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { UIimages } from '../../helpers/load-images'


const getBackgroundImgUrl = name => `url("${UIimages[name]}")`

function getImgSrc (agenda) {
  switch (agenda) {
    case 'm':
      return UIimages['agenda-military']
    case 'p':
      return UIimages['agenda-politic']
    case 's':
      return UIimages['agenda-science']
    case 'x':
      return UIimages['agenda-any']
  }
}


const useStylesCard = createUseStyles(theme => ({
  closeOverlay: {
    position: 'fixed',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  card: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: {
      image: getBackgroundImgUrl('card-front'),
      size: 'cover'
    },
    zIndex: 3
  },
  name: {},
  type: {},
  sex: {},
  defense: {},
  century: {},
  activationPrice: {},
  illustration: {},
  abilities: {},
  ability: {},
  abilityText: {},
  specialAbility: {}
}))


const useStylesAbility = createUseStyles({
  wrapper: {
    display: 'flex',
    width: ({ doublePrice, baseSize }) => doublePrice ? baseSize * 2 : baseSize
  },
  abilityPrice: {
    height: ({ baseSize }) => baseSize * 0.6,
    flex: 1,
    position: 'relative'
  },
  agendaNumber: {
    position: 'absolute'
  },
  agenda: {
    width: ({ baseSize }) => baseSize * 0.3,
    position: 'absolute',
    top: 4
  },
  singleAgenda: {
    extend: 'agenda',
    left: 26
  },
  firstAgenda: {
    extend: 'agenda',
    left: 2
  },
  secondAgenda: {
    extend: 'agenda',
    left: 52
  }
})


function getAbilityPrice (prices) {
  return prices.split(' ').map((price) => ({
    amount: price[0],
    firstAgenda: price[1],
    secondAgenda: price[2],
    image: price[2] ? getBackgroundImgUrl('ability-double') : getBackgroundImgUrl('ability-single')
  }))
}


function AbilityPrice ({ prices }) {
  const c = useStylesAbility({
    doublePrice: (prices.length === 2),
    baseSize: 94
  })

  return (
    <div className={c.wrapper}>
      {prices.map((price, index) =>
        <div
          key={index}
          className={c.abilityPrice}
          style={{
            backgroundImage: price.image,
            left: (index === 1) ? '-2px' : 0
          }}
        >
          <span className={c.agendaNumber}>{price.amount}</span>
          <img
            className={price.secondAgenda ? c.firstAgenda : c.singleAgenda}
            src={getImgSrc(price.firstAgenda)}
            alt="firstAgenda"
          />
          {price.secondAgenda &&
            <img
              className={c.secondAgenda}
              src={getImgSrc(price.secondAgenda)}
              alt="secondAgenda"
            />
          }
        </div>
      )}
    </div>
  )
}


export default function Card ({ data, setCard }) {
  const theme = useTheme()
  const c = useStylesCard({ theme })

  const { name, img, type, century, sex, price, defense, abilities, special, flavortext } = data

  return (
    <>
      <div className={c.closeOverlay} onClick={() => {setCard(null)}}></div>

      <div className={c.card}>
        <div>
          <span className={c.name}>{name}</span>
          <span className={c.defense}>{defense}</span>
          <span className={c.type}>{type}</span>
          <span className={c.sex}>{sex}</span>
          <p className={c.century}>{century}</p>
          <div className={c.activationPrice}>{price}</div>
        </div>
        <img className={c.illustration} src={img} alt={name}/>
        <div className={c.abilities}>
          {abilities && abilities.map((ability, index) =>
            <div className={c.ability} key={index}>
              <AbilityPrice prices={getAbilityPrice(ability.price)}/>
              <span className={c.abilityText}>{ability.text}</span>
            </div>
          )}
        </div>
        {special && <div>
          <span className={c.specialAbility}>{special}</span>
        </div>}
        <p>{flavortext}</p>
      </div>
    </>
  )
}
