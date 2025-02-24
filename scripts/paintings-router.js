const supa = require('@supabase/supabase-js');
const dotenv = require('dotenv').config(); 
const supaUrl = process.env.SUPA_URL;
const supaAnonKey = process.env.SUPA_ANON_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

//Route that gets all paintings
const getAllPaintings = (app) =>
    {
        app.get("/api/paintings", async (req, res) => {
        const {data, error} = await supabase
        .from('paintings')
        .select('*, artists (*), galleries (*)')
        .order('title', {ascending:true});
        res.send(data)
        });
    }
//Route to get paintings sorted by year or title 
const getPaintingsSortbyTitleOrYear = (app) =>
    {
        //by title
        app.get("/api/paintings/sort/:method", async (req, res) => {
        if(req.params.method == 'title')
        {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .order('title', {ascending:true});
            res.send(data)
        }
        //by year
        else if (req.params.method == 'year')
        {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .order('yearOfWork', {ascending:true});
            res.send(data) 
        }

        });
    }
//Route to get painting by id 
const getSpecificPaintingsId = (app) =>
    {
        app.get("/api/paintings/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('paintings')
        .select('*, artists (*), galleries (*)')
        .eq('paintingId',req.params.id);
        if(data.length === 0)//Check if returned empty array
            {
                res.json("No painting with with the id");
            }
        else{
            res.send(data)
            }
        });
    }
//Route to get painting based on inputted characters and title
const getPaintingsbySubtring = (app) =>
    {
        app.get("/api/paintings/search/:substring", async (req, res) => {
        const {data, error} = await supabase
        .from('paintings')
        .select('*, artists!inner (*), galleries!inner(*)')
        .ilike('title',`%${req.params.substring}%`);
        if(data.length === 0)//Check if returned empty array
            {
                res.json("No painting title with with the substring");
            }
        else{
            res.send(data)
            }
        });
    }
//Route to get paintings based on year range inputted.
const getPaintingsYearRange = (app) =>
    {
        app.get("/api/paintings/years/:start/:end", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .gte("yearOfWork", req.params.start)
            .lte("yearOfWork", req.params.end)
            .order("yearOfWork",{ascending:true});
            if(data.length === 0)//Check if returned empty array
                {
                    res.json("no paintings within that year range. Try a different range." );
                }
            else{
                res.send(data)
                }
            });
    }
//Route to get paintings by their gallery id
const getPaintingsbyGalleryId = (app) =>
    {
        app.get("/api/paintings/galleries/:gId", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .eq("galleryId",req.params.gId)
            if(data.length === 0)//Check if returned empty array
                {
                    res.json("No gallery with with the id");
                }
            else{
                res.send(data)
                }
            });
    }
//Route to get painting bases on the artist
const getPaintingsbyArtistId = (app) =>
    {
        app.get("/api/paintings/artist/:aId", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .eq("artistId",req.params.aId)
            if(data.length === 0)//Check if returned empty array
                {
                    res.json("No artist with with the id" );
                }
            else{
                res.send(data)
                }
            });
    }
//Route to get painting based on artist nationality
const getPaintingsbyArtistNationality = (app) =>
    {
        app.get("/api/paintings/artist/country/:substring", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select(`*, artists!inner (*), galleries (*)`)
            .ilike('artists.nationality',`${req.params.substring}%`);
            if(data.length === 0)
                {
                    res.json("No artist nationality with with the characters ");
                }
            else{
                res.send(data)
                }
            });
    }

module.exports = {
    getAllPaintings,
    getPaintingsSortbyTitleOrYear,
    getSpecificPaintingsId,
    getPaintingsbySubtring,
    getPaintingsYearRange,
    getPaintingsbyGalleryId,
    getPaintingsbyArtistId,
    getPaintingsbyArtistNationality
    };