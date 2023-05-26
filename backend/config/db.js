const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn =  await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error){
        console.log(`Error: ${error}`);
        process.exit();
    }
}

module.exports = connectDB;