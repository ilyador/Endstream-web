import React, { useEffect } from 'react'
import { db } from './firebase'
import axios from 'axios'
import Preload from 'react-preload'
import { illustrations, imageArray } from './load-images'
import Board from './Board'


const ENV_URL = (process.env.NODE_ENV !== 'production') ?
  'REACT_APP_FUNCTIONS_URL_LOCAL' : 'REACT_APP_FUNCTIONS_URL'

const BASE_URL = process.env[ENV_URL]

const functionURLs = {
  addUser: BASE_URL + '/add-user'
}


function App () {
  const loadingIndicator = (<div>Loading...</div>)

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
      {/*<button onClick={callFunction}>FUNCTION</button>*/}
      <Board/>
    </Preload>
  )
}

export default App
