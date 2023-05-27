const mongoose = require("mongoose");
const connectDB= async()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://daminipatidar080:daminipatidar@cluster0.bwsplb2.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
       
         } );
         console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    process.exit();
    }
};
module.exports = connectDB;