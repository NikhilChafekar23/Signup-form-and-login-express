const mongoose = require('mongoose')
// require('dotenv').config({ path:'../.env' });


require('dotenv').config({ path: '../.env' });
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('mongodb connected');
    })
    .catch((err) => {
        console.error('Failed to connect:', err.message);
    });



const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,  
      },
      email: {
        type: String,
        required:true,  
      },
      password: {
        type: String,
        required:true,
      },
      confirmPassword: {
        type: String,
        required:true,
      },

})

const collection = new mongoose.model("Collection1", signupSchema)

module.exports=collection




