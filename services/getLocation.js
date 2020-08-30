const axios = require('axios')
 const getLocation =  (direccion,city)=>{
     let direct = direccion.toString();
     let ciudad = city.toString()
     const data = axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:`${direct}${ciudad}`,
          key:process.env.API_KEY
        }
      }).then( response=> response.data.results[0].geometry.location)
return data

}

module.exports.getLocation = getLocation