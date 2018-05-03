import express from 'express'
import graphql from 'graphql'

const app = express()

app.get('/', (req, res, next) => {
    res.send("test")
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})