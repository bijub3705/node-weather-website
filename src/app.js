const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodes = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')


//setup handlers engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath) // only if you give a different name other than 'views'
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

//app.get('',(req, res) =>{// if the above line is added, this doesn't make sense
//    res.send('<h1>Hello express</h1>')
//})

//app.get('/help',(req, res) =>{
//    res.send('<h1>Hello express</h1>')
//})

//app.get('/about',(req, res) =>{
//    res.send([{
//        name: 'Biju',
//        age: 32
//    },{
//        name: 'Vidhya',
//        age: 27
//    }])
//})


app.get('',(req, res) =>{
    res.render('index',{
        title:'Weather App',
        name: 'Biju'
    })
})


app.get('/about',(req, res) =>{
    res.render('about',{
        title:'About me',
        name: 'Biju'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title:'Help',
        description:'Weather App description',
        name: 'Biju'
    })
})


app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }

    geocodes(req.query.address, (error,{latitude, longitude, location} = {})=>{ 
        if(error){
            return res.send({ error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
               return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData.forcast,
                location: forecastData.feelslike,
                Address: req.query.address
            })
        })      
    
        console.log('Testing log in geocode')
    })  


    
})

app.get('/help/*',(req, res) =>{
    res.render('notfound',{
        title: 404,
        description:'Help article not found',
        name: 'Biju'
    })
})

app.get('*',(req, res) =>{
    res.render('notfound',{
        description:'Page not found',
        name: 'Biju'
    })})

app.listen(port, () =>{
    console.log('Server is up on port '+port )
})