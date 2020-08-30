const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors  = require('cors')
const PORT = process.env.PORT || 3000

dotenv.config();

//Load files routes
const userRoute = require('./src/routes/user.route');
const businessRoute = require('./src/routes/business.route');
const categoryRoute = require('./src/routes/category.route');
const inventaryRoute = require('./src/routes/inventary.route');
const productRoute = require('./src/routes/product.route');
const pointofsaleRoute = require('./src/routes/pointofsales.route');
const factureRoute = require('./src/routes/facture.route');





//Middlewares

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(helmet());
app.use(cors());


//DB
const db = require('./src/models');
db.sequelize.sync();




// Routes defineds

app.use('/API/user',userRoute);
app.use('/API/empresa',businessRoute);
app.use('/API/categoria',categoryRoute);
app.use('/API/inventario',inventaryRoute);
app.use('/API/producto',productRoute);
app.use('/API/puntoventa',pointofsaleRoute);
app.use('/API/factura',factureRoute);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`); 
    
})