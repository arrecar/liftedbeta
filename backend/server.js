const express = require('express');
//const users = require('./data/userstest');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const path = require('path');



const app = express();
dotenv.config();
connectDB();
app.use(express.json());




/*app.get('/api/users', (req, res) => {
    res.json(users)
});*/

/*app.get('/api/users/:id', (req, res) => {
    const user = users.find((n) => n._id === req.params.id);
    res.send(user);
});*/

app.use('/api/users', userRoutes)

//-------------deployment-------------

__dirname=path.resolve();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'frontend','buidl','index.html'))
    })
}else{
    app.get('/', (req, res) => {
        res.send("API is running..")
    });
}

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));