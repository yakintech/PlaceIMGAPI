const resizeOptimizeImages = require('resize-optimize-images');








const { v4: uuidv4 } = require('uuid');

console.log(uuidv4());





 
(async () => {
    // Set the options.
    const options = {
        images: ['images/kopek.jpg', 'images/kopek.jpg'],
        width: 800,
        height:601,
        quality:90
    };
 
    // Run the module.
    await resizeOptimizeImages(options);
})();