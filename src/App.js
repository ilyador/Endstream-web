import React, { useEffect } from 'react'
import { db } from './firebase'
import axios from 'axios'
import { createUseStyles, useTheme } from 'react-jss'
import Preload from 'react-preload'
import { imageArray } from './load-images'
import Board from './Board'
import Deck from './Deck'


const ENV_URL = (process.env.NODE_ENV !== 'production') ?
  'REACT_APP_FUNCTIONS_URL_LOCAL' : 'REACT_APP_FUNCTIONS_URL'

const BASE_URL = process.env[ENV_URL]

const functionURLs = {
  addUser: BASE_URL + '/add-user'
}


const useStyles = createUseStyles(theme => ({
  app: {
    backgroundColor: theme.colorPrimary,
    color: theme.textColor,
    height: '100%'
  }
}))


function App () {
  const loadingIndicator = (<div>Loading...</div>)
  const theme = useTheme()
  const c = useStyles({ theme })

  useEffect(() => {
    db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`)
      })
    })
  }, [])

  function callFunction () {
    axios.post(functionURLs.addUser, { name: 'ilya3' })
      .then(console.log)
      .catch(console.log)
  }

  return (
    <Preload
      loadingIndicator={loadingIndicator}
      images={imageArray}
      autoResolveDelay={3000}
    >
      <div className={c.app}>
        <button onClick={callFunction}>FUNCTION</button>
        <Board/>
        <Deck/>
      </div>
    </Preload>
  )
}

export default App
