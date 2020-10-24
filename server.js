const express = require('express');
const app = express();
const image = require('./data/mongoosemodels.js');
const path = require('path');
const { match } = require('assert');
const { QueryCursor } = require('mongoose');

// import { image } from './data/mongoosemodels.js'

//https://placeimg.com/640/480/
//https://placeimg.com/640/480/animals

//Eğer soru işareti var ise route boş geçilebilir. Kullanıcı o parametreyi yollamak zorunda değil
app.get('/img/:width?/:height?/:category?', (req, res) => {

    let rwidth = req.params.width;
    let rheight = req.params.height;
    let rcategory = req.params.category;

    let query = { "width": rwidth, "height": rheight, "categories.name": rcategory }

    if(rheight == undefined){
        delete query.height;
    }
    if(rwidth == undefined){
        delete query["width"];
    }
    if(rcategory == undefined){
        delete query["categories.name"];
    }
    
    
    
    image.find(query, (err, doc) => {

        if (!err) {
            if (doc.length != 0) {
                let count = doc.length;
                let rastgele = Math.floor(Math.random() * count); 
                var result = path.join(__dirname, 'images', doc[rastgele].path)

                res.sendFile(result);
            }
            else{
                res.send('Kriterlere uygun resim bulunamadı')
            }
        }
        

    })


})


app.listen(3000);