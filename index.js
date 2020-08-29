const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors  = require('cors')
const PORT = process.env.PORT || 3000

dotenv.config();

//Load files routes






//Middlewares

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(helmet());
app.use(cors());


//DB
const db = require('./src/models');
db.sequelize.sync();




// Routes defineds