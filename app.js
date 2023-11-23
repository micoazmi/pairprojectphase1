const express = require('express')
const app = express()
const port = 3000

app.set('view engines', 'ejs')
app.use(express.urlencoded ({extended:true}))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})