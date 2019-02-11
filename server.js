//imports
const express = require('express')
//instantiations
const app = express()

//middleware
app.use((req, res, next) => {
    //console.log('{req.method}: ${req.url}')
    console.log(`${req.method}: ${req.url}`)
    next()
})

app.use((req, res, next) => {
    if (req.query.api_key) {
        next()
    } else {
        res.status(401).send({msg: 'Not authorized'})
    }
})

//Routes
/*app.get('/accounts', (req, res) => {
    console.log(`${req.method}: ${req.url}`)
    res.send({msg:'accounts'})
})*/

app.get('/accounts', (req, res, next) => {
    console.log('accounts inline middleware!  Yahoo!')
    next(new Error('Opsss'))
},(req, res) => {
    console.log(`${req.method}: ${req.url}`)
    res.send({msg:'accounts'})
})


app.get('/transactions', (req, res) => {
    console.log(`${req.method}: ${req.url}`)
    res.send({msg:'transactions. Yahooooooooo! OK'})
})

app.use((error, req, res, next) => {
    res.status(500).send(error)
})

/* app.get('/', (req, res) => {
    res.send({msg:'hello world!!'})
})
 */

//Bootup
app.listen(3000)
