const {model, Schema} = require('mongoose');


const user_scahema = new Schema({
    username:{
        type:String,
        required:true,
    }
})

const User = model('User', user_scahema);

module.exports = User;
