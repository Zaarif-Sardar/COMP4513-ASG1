const express = require('express');
const app = express();

//Initialize route modules
const router = require('./scripts/router.js');
const artistRouter = require('./scripts/artists-router.js')
const paintingRouter = require('./scripts/paintings-router.js')
const genresRouter = require('./scripts/genres-router.js');
const paintingExtraRouter = require('./scripts/paintingsExtras-router.js');
const countRouter = require('./scripts/count-routes.js');

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
paintingRouter.getSpecificPaintingsId(app);
paintingRouter.getPaintingsbySubtring(app);
paintingRouter.getPaintingsYearRange(app);
paintingRouter.getPaintingsbyGalleryId(app);
paintingRouter.getPaintingsbyArtistId(app);
paintingRouter.getPaintingsbyArtistNationality(app);

//Genre Routes
genresRouter.getAllGenres(app);
genresRouter.getSpecificGenre(app);
genresRouter.getGenresOfPainting(app);

//Paintings Extra Routes 
paintingExtraRouter.getPaintingsBasedOnGenreID(app);
paintingExtraRouter.getPaintingsBasedOnEras(app);

//count routes
countRouter.getPaintingsCountPerGenre(app);
countRouter.getPaintingsCountPerArtist(app);
countRouter.getTopGenres(app);


//set port and testing routes 
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
    console.log('http://localhost:8080/api/paintings/sort/year');
    console.log('http://localhost:8080/api/paintings/sort/title');
    console.log('http://localhost:8080/api/paintings/63');
    console.log('http://localhost:8080/api/paintings/search/fra');
    console.log('http://localhost:8080/api/paintings/years/1835/1905');
    console.log('http://localhost:8080/api/paintings/galleries/5');
    console.log('http://localhost:8080/api/paintings/artist/5');
    console.log('http://localhost:8080/api/paintings/artist/country/ital');
    console.log('******Genre ROUTES******');
    console.log('http://localhost:8080/api/genres');
    console.log('http://localhost:8080/api/genres/76');
    console.log('http://localhost:8080/api/genres/painting/408');
    console.log('******Painting Extra ROUTES******');
    console.log('http://localhost:8080/api/paintings/genre/78');
    console.log('http://localhost:8080/api/paintings/era/2');
    console.log('******Count ROUTES******');
    console.log('http://localhost:8080/api/count/genres');
    console.log('http://localhost:8080/api/count/artists');
    console.log('http://localhost:8080/api/count/topgenres/ref');
    });


