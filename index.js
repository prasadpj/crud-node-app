const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

console.log('Hi there'); 


app.use(bodyParser.json())

app.use(authenticate)

app.get('/get_data', getData)
app.get('/get_data/:id', getData)
app.post('/put_data', insertData)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
// module.exports = server;



function getData(req, res, next) {
    console.log(req.query.params)
    console.log(req.params)
    // TODO call a service
    res.send({
        msg: 'hi there'
    })
}

function insertData(req, res, next) {
    console.log(req.body);
    // TODO call a service
    res.send({
        msg: 'data submitted'
    })
}
function authenticate(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send("Unauthorised user.")
    }
    const [, token] = authHeader.split(' ');
    if (token === 123) {
        return res.status(401).send("invalid token")
    }
    return next();
}