const express = require("express")
const app = express()
app.use(express.json())
require('dotenv').config()  

//ROUTES
const authRoute=require('./routes/auth');
const usersRoute=require('./routes/users');
const moviesRoute=require('./routes/movies');
const listsRoute=require('./routes/lists');

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/movies',moviesRoute);
app.use('/api/lists',listsRoute);

const mongoose=require("mongoose")


//JSON

// connect  database 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected successfully to MongoDB server');
    })
    .catch((err) => console.error(err));



app.listen(process.env.PORT,()=>{
    console.log('Backend server is running ...')
})