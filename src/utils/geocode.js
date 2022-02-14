const request=require('request')

const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm96ZXIwMDciLCJhIjoiY2t6ZnVma3RyMHVhdjJvcGNzZnhha2RzZSJ9.vF2RAxQfY0TGE7YDsPzUlA&limit=1`

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to geocoding service!!",undefined)
        }
        else if(body.features.length=== 0){
            callback("No such location exist",undefined)
        }
        else{
            const data={
                laltitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            }

            callback(undefined,data)
        }
    })
}


module.exports=geocode