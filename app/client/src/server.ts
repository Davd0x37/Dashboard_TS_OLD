import express from 'express'
const app1 = express()

app1.get('/app1', (req, res) => {
  res.send('app1')
})

app1.listen(3001)