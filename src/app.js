const path = require('path')  //core module
const express=require('express')   //npm module
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const app=express()

const port=process.env.PORT || 3000
// console.log(path.join(__dirname,"../..")) // to node js folder

//define path for express config
const publicDir=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views") // create a custom views path
const partialsPath=path.join(__dirname,"../templates/partials")

// app.get('',(req,res)=>{
//     res.send('Hello Express')
// })   // won't run due to app.use()
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:"rozer",
//         age:21
//     },
//     {
//         name:'kshetrimayum',
//         age:23
//     }
// ])
// })

//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)  //customizing the location of the veiws to template Path
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDir))  // for static assets

app.get('',(req,res)=>{
    res.render("index",{
        title:'Weather',
        name:'Rozer'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rozer Kshetrimayum'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:'This will help you with anything',
        name:"Rozer"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({   // since only one res is possible use return to return the function
            error:"Provide an Address"
        })
    }

    geocode(req.query.address,(error,{laltitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(laltitude,longitude,(error, forecastData)=>{
            if(error){
                return console.log({error})
            }
            res.send({
                location:location,
                forecast:forecastData
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({   // since only one res is possible use return to return the function
            error:"Provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        name:"Rozer",
        title: "404 Help",
        msg : "Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        name:"Rozer",
        title: "404",
        msg : "Page not found"
    })
})

app.listen(port,()=>{
    console.log("Server is up on port ",port)
})