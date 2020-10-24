const express = require('express');
const app = express();



let ad = 'Çağatay';

// console.log('Adınız: ' + ad);

// //template literal
// console.log(`Adınız: ${ad} yıldız`);


app.get('/product/:categoryid/:id', (req, res) => {

    let id = req.params.id;
    let categoryid = req.params.categoryid;

    console.log(`Categoryid: ${categoryid} ID: ${id}`)

    res.send('OK!');
})

//Querystring
app.get('/supplier',(req,res)=>{
    let id = req.query.id;
    console.log(`Supplierid ${id}`);
    console.log(req.query);

    res.send('Ok Supplier!');
})




app.listen(3000);