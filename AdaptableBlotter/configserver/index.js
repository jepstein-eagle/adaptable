var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

var ABConfigFolder = "./tmp/"

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/adaptableblotter-config', function (req, res) {
var username = req.headers["ab_username"]
if (username) {
        var filename = ABConfigFolder + username + ".json"
        fs.readFile(filename, { encoding: 'utf8'}, function (err, data) {
            if (err) {
                res.sendStatus(500);
                console.log("Error Getting config for : " + username + "\n" + err);
            }
            else {
                res.status(200).send(data)
            }
        })
    }
    else {
        res.sendStatus(403)
    }
})

app.put('/adaptableblotter-config', function (req, res) {
    var username = req.headers["ab_username"]
    if (username) {
        var filename = ABConfigFolder + username + ".json"
        fs.writeFile(filename, JSON.stringify(req.body, null, "\t"), { encoding: 'utf8'}, function (err) {
            if (err) {
                res.sendStatus(500);
                console.log("Error saving config for : " + username + "\n" + err);
            }
            else {
                res.sendStatus(200)
            }
        })
    }
    else {
        res.sendStatus(403)
    }

})

app.listen(3000, function () {
    console.log('Config Server listening on port 3000!')
})