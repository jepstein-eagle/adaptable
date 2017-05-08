var openfinLauncher = require('openfin-launcher')

openfinLauncher.launchOpenFin({
        configPath: 'http://localhost:8080/appoffline.json'
    })
    .then(function() {
        console.log('success!')
    })
    .fail(function(error) {
        console.log('error!', error)
    })