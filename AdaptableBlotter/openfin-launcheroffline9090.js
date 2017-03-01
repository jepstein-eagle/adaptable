var openfinLauncher = require('openfin-launcher')

openfinLauncher.launchOpenFin({
        configPath: 'http://localhost:9090/appoffline.json'
    })
    .then(function() {
        console.log('success!')
    })
    .fail(function(error) {
        console.log('error!', error)
    })