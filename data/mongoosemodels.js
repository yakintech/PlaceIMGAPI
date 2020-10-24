const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://azra_elturco:1996417B@cluster417-vl3kd.mongodb.net/placeimg?authSource=admin&replicaSet=Cluster417-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', { useNewUrlParser: true })

const Schema = mongoose.Schema;

const imgSchema = new Schema({
    name: String,
    categories: [
        {
            name: String
        }
    ],
    addDate: { type: Date, default: Date.now },
    width: Number,
    height: Number,
    filter: String,
    path: String
})

const image = mongoose.model('image', imgSchema);


var img = new image({
    name: 'Masa resmi',
    width: 640,
    height: 480,
    categories: [{name:'House'}],
    path: 'masa.jpg'
})

img.save((err,doc)=>{
    console.log(err);
});

module.exports = image