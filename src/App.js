import React, { useEffect } from 'react'
import { db } from './firebase'
import axios from 'axios'
import Preload from 'react-preload'
import { illustrations, imageArray } from './load-images'


const ENV_URL = (process.env.NODE_ENV !== 'production') ? 'REACT_APP_FUNCTIONS_URL_LOCAL' : 'REACT_APP_FUNCTIONS_URL'
const BASE_URL = process.env[ENV_URL]

const functionURLs = {
  addUser: BASE_URL + '/add-user'
}


function App () {

  var loadingIndicator = (<div>Loading...</div>)

  useEffect(() => {
    db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`)
      })
    })
  }, [])

  function callFunciton () {
    axios.post(functionURLs.addUser, { name: 'ilya3' })
      .then(console.log)
      .catch(console.log)
  }

  return (
    <div className='App'>
      <button onClick={callFunciton}>FUNCTION</button>

      <Preload
        loadingIndicator={loadingIndicator}
        images={imageArray}
        autoResolveDelay={3000}
      >
        <div>
          <img src={illustrations['big/Mori-the-Piercer']} alt="Mori" />
        </div>
      </Preload>
    </div>
  )
}

export default App
