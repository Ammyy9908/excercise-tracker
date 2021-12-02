const express = require('express')
const app = express()
const cors = require('cors')
const makeConnection = require('./utils/db_connection')
const User = require('./models/User')
require('dotenv').config()
makeConnection().then(()=>{console.log('Database connected')}).catch((e)=>console.log(e));
app.use(cors())
app.use(express.json(), express.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.get('/api/users',async (req,res)=>{
  const users = await User.find({});
  res.status(200).json(users);
})

app.post('/api/users',async (req,res)=>{
  const {username} = req.body;
  console.log(username)
  const user = await User.findOne({username:username});
  if(user){
    return res.status(400).send('User already exists');
  }
  const newUser = new User({username});
  newUser.save().then((user)=>{
    res.send({
      username:user.username,
      _id:user._id
    });
  });
})





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
