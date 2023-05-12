const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()

mongoose.connect(process.env.MONGO_DB).then(console.log("Connected to DB")).catch(e => console.error(e))

const app = express()
let port = 8080

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

const subjuntivoRouter = require('./routes/subjuntivoRouter')

app.get('/', subjuntivoRouter)

// Read
app.get('/api/subjuntivo/read', subjuntivoRouter)
// Create
app.post('/api/subjuntivo/create', subjuntivoRouter)
// Update
app.get('/api/subjuntivo/update/:id', subjuntivoRouter)
app.post('/api/subjuntivo/update/:id', subjuntivoRouter)
// Delete
app.post('/api/subjuntivo/delete/:id', subjuntivoRouter)

app.listen(port, () => {
    console.log(`Connected on port ${port}`);
})