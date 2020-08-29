
const getLocation = (address,city)=>{
    let address = address.split('#')
    let numeral = "23"
    let API_URL = `https://maps.googleapis.com/maps/api/geocode/json?&address=calle150a%2395-30Bogota+CA&key=${process.env.API_KEY}`


}

module.exports.getLocation = getLocation