const express = require('express');
const app = express();
const image = require('./data/mongoosemodels.js');
const path = require('path');
const resizeOptimizeImages = require('resize-optimize-images');
const { v4: uuidv4 } = require('uuid');




//https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
// image.find({ $or:[{name:'çağatay'}] })

// image.find({rate:1.3},(err,result)=>{
//     console.log(result)
// })

// import { image } from './data/mongoosemodels.js'
//https://placeimg.com/640/480/
//https://placeimg.com/640/480/animals

//Eğer soru işareti var ise route boş geçilebilir. Kullanıcı o parametreyi yollamak zorunda değil
app.get('/img/:width?/:height?/:category?', (req, res) => {

    let rwidth = req.params.width;
    let rheight = req.params.height;
    let rcategory = req.params.category;
    let rrate = (rwidth / rheight).toFixed(1);


    //let query = { "width": rwidth, "height": rheight, "categories.name": rcategory }
    let query = { rate: rrate, "categories.name": rcategory };
    if (rheight == undefined) {
        delete query.height;
    }
    if (rwidth == undefined) {
        delete query["width"];
    }
    if (rcategory == undefined) {
        delete query["categories.name"];
    }

    image.find(query, (err, doc) => {

        if (!err) {
            if (doc.length != 0) {
                let count = doc.length;
                let rastgele = Math.floor(Math.random() * count);
                var result = path.join(__dirname, 'images', doc[rastgele].path)
                var responseresult = path.join(__dirname, 'responseimages', uuidv4() + '.jpeg' )
                //640*480
                //640*481

                const options = {
                    images: [result, responseresult],
                    width: rwidth,
                    height:rheight,
                    quality:90
                };
             
                // Run the module.
                await resizeOptimizeImages(options);
                
                res.sendFile(responseresult);
            }
            else {
                res.send('Kriterlere uygun resim bulunamadı')
            }
        }


    })

    
})


app.listen(3000);