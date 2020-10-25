const express = require('express');
const app = express();
const image = require('./data/mongoosemodels.js');
const path = require('path');
const resizeOptimizeImages = require('resize-optimize-images');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');




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

    image.find(query, async (err, doc) => {

        if (!err) {
            if (doc.length != 0) {
                let count = doc.length;
                let rastgele = Math.floor(Math.random() * count);

                //db deki rastgele bir resmin yolunu buldum
                let imagepath = doc[rastgele].path;
                let clientpath = uuidv4() + '.jpeg';

                //bu resimden bir kopya oluşturuyorum. Sonra kopya resmin boyutunu değiştirip kullanıcıya gönderiyorum
                fs.copyFile(`images/${imagepath}`,`images/${clientpath}`,function(err){
                    console.log(err);
                })

                 var resultpath = path.join(__dirname, 'images' ,clientpath )

                const options = {
                    images: [resultpath],
                    width: Number(rwidth),
                    height:Number(rheight),
                    quality:90
                };
                await resizeOptimizeImages(options).catch((err)=>{
                    console.log(err);
                });
                
                res.sendFile(resultpath);

            }
            else {
                res.send('Kriterlere uygun resim bulunamadı')
            }
        }


    })

})


app.listen(3000);