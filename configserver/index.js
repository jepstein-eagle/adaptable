"use strict"
var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var _ = require('lodash')

var ABConfigFolder = "./tmp/"
var ApplicationConfigFileName = ABConfigFolder + "Application.abjson"

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/adaptableblotter-config', function (req, res) {
    var username = req.headers["ab_username"]
    var adaptableblotter_id = req.headers["ab_id"]
    try {
        if (username) {
            let filename = ABConfigFolder + username + "_" + adaptableblotter_id + ".abjson"
            let ApplicationConfig
            let UserConfig
            if (fs.existsSync(ApplicationConfigFileName)) {
                ApplicationConfig = JSON.parse(fs.readFileSync(ApplicationConfigFileName, { encoding: 'utf8' }))
            }

            if (fs.existsSync(filename)) {
                UserConfig = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8' }))
                console.log("Sending config for : " + username);
                let mergedStates = MergePredefinedWithUser(ApplicationConfig, UserConfig)
                res.status(200).send(JSON.stringify(mergedStates))
            }
            else {
                //nothing yet in the user config
                console.log("No current config for : " + username);
                if (ApplicationConfig) {
                    res.status(200).send(JSON.stringify(ApplicationConfig))
                }
                else {
                    res.status(200).send({})
                }
            }
        }
        else {
            console.error("No current username for load : " + username);
            res.sendStatus(403)
        }
    }
    catch (error) {
        res.sendStatus(500);
        console.error("Error Getting config for : " + username + "\n" + error);
    }
})

app.put('/adaptableblotter-config', function (req, res) {
    var username = req.headers["ab_username"]
    var adaptableblotter_id = req.headers["ab_id"]
    if (username) {
        let filename = ABConfigFolder + username + "_" + adaptableblotter_id + ".abjson"
        let state = req.body
        FilterPredefinedItems(state)
        fs.writeFile(filename, JSON.stringify(state, null, "\t"), { encoding: 'utf8' }, function (err) {
            if (err) {
                res.sendStatus(500);
                console.error("Error saving config for : " + username + "\n" + err);
            }
            else {
                console.log("Saved for : " + username);
                res.sendStatus(200)
            }
        })
    }
    else {
        console.error("No current username for save : " + username);
        res.sendStatus(403)
    }

})

app.listen(3000, function () {
    console.log('Config Server listening on port 3000!')
})

function FilterPredefinedItems(state) {
    // we iterating substate here
    for (let substateName in state) {
        if (state.hasOwnProperty(substateName)) {
            let substate = state[substateName]
            //we look for arrays of entities and will filter predefined Items
            //works only if array is at rootlevel. Will need enhancement if that was to change
            for (let property in substate) {
                if (substate.hasOwnProperty(property)) {
                    if (Array.isArray(substate[property])) {
                        substate[property] = substate[property].filter(x => !x.IsPredefined)
                    }
                }

            }
        }
    }
}

function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

function MergePredefinedWithUser(predefinedState, userState) {
    const result = _.extend({}, predefinedState);

    for (const key in userState) {
        if (!userState.hasOwnProperty(key)) {
            continue;
        }
        const value = userState[key];

        // Assign if we don't need to merge at all
        if (!result.hasOwnProperty(key)) {
            result[key] = _.isObject(value) && !Array.isArray(value)
                ? _.merge({}, value)
                : value;
            continue;
        }

        const oldValue = result[key];

        if (_.isObject(value) && !Array.isArray(value)) {
            result[key] = _.mergeWith({}, oldValue, value, customizer);
        } else {
            result[key] = value;
        }
    }

    return result;
}