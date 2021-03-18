import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { UIimages } from '../../helpers/load-images'
import { groupBy as _groupBy, sortBy as _sortBy } from 'lodash-es'


const getBackgroundImgUrl = name => `url("${UIimages[name]}")`


const useStyles = createUseStyles(theme => ({
  card: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: {
      image: getBackgroundImgUrl('card-front'),
      repeat: 'no-repeat'
    }
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
  abilityPrice: {},
  abilityText: {}
}))


function getAbilityPrice (price) {
  const agendas = price.split(' ')

}


export default function Card ({ data }) {
  const theme = useTheme()
  const c = useStyles({ theme })

  const { name, img, type, century, sex, price, defense, abilities, special, flavortext } = data


  return (
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
        {abilities.map((ability, index) => (
          <div className={c.ability} key={index}>
            <span className={c.abilityPrice}>{ability.price}</span>
            <span className={c.abilityText}>{ability.text}</span>
          </div>
        ))}
      </div>
      {special && <div>
        <span className={c.specialAbility}></span>
        <span className={c.specialText}>{special}</span>
      </div>}
      <p>{flavortext}</p>
    </div>
  )
}
