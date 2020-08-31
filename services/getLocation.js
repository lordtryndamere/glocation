//SERVICIO QUE CONECTA CON LA API DE GOOGLE PARA OBTENER UBICACION GEOGRAFICA
const axios = require('axios');

 const getLocation =  (direccion,city)=>{
     let direct = direccion.toString();
     let ciudad = city.toString()
     const data = axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:`${direct}${ciudad}`,
          key:process.env.API_KEY || "AIzaSyC-L0qbyGTo5fhoMzk3HoqUcOjwt4GVU90"
        }
      }).then( response=> response.data.results[0].geometry.location)
      .catch(err=>err )
      
return data

}

module.exports.getLocation = getLocation