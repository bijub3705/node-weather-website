const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=afd79026c06de863097c18cfa6dd3d4f&query=37.8267,-122.4233&units=f'

request({url: url}, (error,response) =>{
   // const data = JSON.parse(response.body)
   // console.log(data)
    //console.log(data.current)
})

request({url: url, json: true}, (error,response) =>{
    if(error){
        console.log("Unalbe to connect to Weather API")
    }else if(response.body.error){
        console.log("Unalbe to get Weather info")
    }
    else{
      //  console.log(response.body.current.weather_descriptions[0]+". Its currently "+response.body.current.temperature+". Its feels like "+response.body.current.feelslike)
    }
})


const forecast = (latitude, longitude, callback) => {
    const foracstUrl = 'http://api.weatherstack.com/current?access_key=afd79026c06de863097c18cfa6dd3d4f&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
    request({url: foracstUrl, json: true}, (error,response) =>{
        if(error){
            callback("Unalbe to connect to Weather API",undefined)
        }else if(response.body.error){
            callback("Unalbe to get Weather info",undefined)
        }else{
            callback(undefined, {
                forcast: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })

}

module.exports = forecast