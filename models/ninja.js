const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// creating a ninja schema and model
const NinjaSchema = new Schema({
    name:{
        type: String,
        require:[true, 'Name field is required']
    },
    rank:{
        type: String
    },
    available:{
        type: Boolean,
        default: false
    }
//     add a geo location
})

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;