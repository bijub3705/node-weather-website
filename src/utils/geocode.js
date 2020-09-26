
const request = require('request')

const geocodes = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmlqdTM3MDUiLCJhIjoiY2tmMG54ZG9tMTAxdzJ6czJxeGdxd3p1OSJ9.1Lv6ToTbuT3aVQnDMgabgw&limit=1'
    const json = true
    request({url, json}, (error,{body} = {}) =>{
        if(error){
            callback("Unalbe to connect to Geo API",undefined)
        }else if(body.features.length === 0){
            callback("Unalbe to get Geo info",undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
     })
}


module.exports = geocodes