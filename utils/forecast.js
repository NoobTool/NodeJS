const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?&lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&key=58a968d0894e4620a579f7f7a164d046'

    request({ url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (res.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,' It is currently ' + res.body.data[0].temp + ' degress out. There is a ' + res.body.data[0].precip + '% chance of rain.')
        }
    })
}

module.exports = forecast