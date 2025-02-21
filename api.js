const express = require('express');
const app = express();



const router = require('./scripts/router.js');

//Gallery Routes
router.getAllEras(app);
router.getAllGalleries(app);
router.getSpecificGallery(app);
router.getCountryGallery(app);



//set port
app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/eras');
    console.log('http://localhost:8080/api/galleries');
    console.log('http://localhost:8080/api/galleries/30');
    console.log('http://localhost:8080/api/galleries/country/fra');
    });

