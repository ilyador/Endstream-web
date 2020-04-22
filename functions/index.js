const express = require('express')
const cors = require('cors')
const functions = require('firebase-functions')
const admin = require('firebase-admin')


const app = express()

app.use(express.json())
app.use(cors())
admin.initializeApp()


app.post('/add-user', async (req, res) => {
  const { name } = req.body
  try {
    await admin.firestore().collection('users').add({ name, games: [] })
    res.status(200).send('User created successfully')
  } catch (error) {
    res.status(500).send(`You are screwd because: ${error}`)
  }
})


exports.app = functions.https.onRequest(app)
