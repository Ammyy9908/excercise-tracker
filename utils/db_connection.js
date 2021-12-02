const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const makeConnection = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        return connection;
    }
    catch(err){
        return err;
    }
}

module.exports = makeConnection;