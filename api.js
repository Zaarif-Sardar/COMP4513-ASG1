const express = require('express');
const app = express();



const router = require('./scripts/router.js');
const artistRouter = require('./scripts/artists-router.js')
const paintingRouter = require('./scripts/paintings-router.js')

//Gallery Routes
router.getAllEras(app);
router.getAllGalleries(app);
router.getSpecificGallery(app);
router.getCountryGallery(app);

//Artists Routes
artistRouter.getAllArtists(app);
artistRouter.getSpecificArtist(app);
artistRouter.getSpecificArtistSubtring(app);
artistRouter.getSpecificArtist(app);
artistRouter.getArtistSubtringCountry(app);

//Paintings Routes
paintingRouter.getAllPaintings(app);
paintingRouter.getPaintingsSortbyTitleOrYear(app);
paintingRouter.getPaintingsYearRange(app);
paintingRouter.getPaintingsbyGalleryId(app);
paintingRouter.getPaintingsbyArtistId(app);
paintingRouter.getPaintingsbyArtistNationality(app);



//set port
app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/eras');
    console.log('http://localhost:8080/api/galleries');
    console.log('http://localhost:8080/api/galleries/30');
    console.log('http://localhost:8080/api/galleries/country/fra');
    console.log('******ARTISTS ROUTES******');
    console.log('http://localhost:8080/api/artists');
    console.log('http://localhost:8080/api/artists/2');
    console.log('http://localhost:8080/api/artists/search/al');
    console.log('http://localhost:8080/api/artists/country/fra');
    console.log('******Painting ROUTES******');
    console.log('http://localhost:8080/api/paintings');
    console.log('http://localhost:8080/api/paintings/year');
    console.log('http://localhost:8080/api/paintings/title');
    console.log('http://localhost:8080/api/paintings/63');
    console.log('http://localhost:8080/api/paintings/search/fra');
    console.log('http://localhost:8080/api/paintings/years/1835/1905');
    console.log('http://localhost:8080/api/paintings/galleries/5');
    console.log('http://localhost:8080/api/paintings/artist/5');
    console.log('http://localhost:8080/api/paintings/artist/country/ital');








    });

