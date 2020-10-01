const express = require('express');
const path = require('path')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

const app = express();


//Custom Paths

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Route Functions

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ram Rattan Goyal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ram Rattan Goyal'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Ram Rattan Goyal',
        msg:'I am the helpful messiah..!!'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if (!address){
        return res.send({error:"Error! Address is required"})
    }

    geocode(address,(error,dat)=>{
        if (error)
            return res.send({error})
        forecast(dat, (error,data)=>{
            if(error)
                return res.send({error})
            return res.send({
                forecast:data,
                location:dat,
                address:address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error.hbs',{
        title:'404 Error',
        name:'Ram Rattan Goyal',
        msg:'Help section unfound..!!'
    })
})

app.get('*',(req,res)=>{
    res.render('error.hbs',{
        title:'404 Error',
        name:'Ram Rattan Goyal',
        msg:'Not found..!!'
    })
})


app.listen(3000, ()=>{
    console.log('The server did start correctly..!!');
})