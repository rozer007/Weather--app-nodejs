const request=require('request')


const forecast=(laltitude,longitude,callback)=>{

    let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(laltitude)}&lon=${encodeURIComponent(longitude)}&units=metric&appid=ad6c33aee94c0a56b485f448955c43cd`

    request({url,json:true},(error,{body})=>{

        if(error)
        {
            callback("unable to connect to the weather service!!",undefined)
        }else if(body.message){
            callback("unable to find location",undefined)
        }
        else
        {     
            callback(undefined,body.current.weather[0].description+" and the temperature is "+body.current.temp+", Timezone : "+body.timezone) 
        }
    })
}

module.exports=forecast

