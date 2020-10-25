
const fs = require('fs');
fs.copyFile('images/kopek.jpg','images/deneme.jpg',function(err){
    console.log(err);
})


const resizeOptimizeImages = require('resize-optimize-images');

const { v4: uuidv4 } = require('uuid');

console.log(uuidv4());
 
// (async () => {
//     // Set the options.
//     const options = {
//         images: ['images/kopek.jpg', 'images/kopru.jpg'],
//         width: 800,
//         height:601,
//         quality:90
//     };
 
//     // Run the module.
//     await resizeOptimizeImages(options);
// })();