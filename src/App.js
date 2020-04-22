import React, { useEffect } from 'react'
import { db } from './firebase'
import axios from 'axios'


const URL = (process.env.NODE_ENV !== 'production') ? 'REACT_APP_FUNCTIONS_URL_LOCAL' : 'REACT_APP_FUNCTIONS_URL'
const BASE_URL = process.env[URL]

const functionURLs = {
  addUser: BASE_URL + '/add-user'
}


function App () {

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
    </div>
  )
}

export default App
