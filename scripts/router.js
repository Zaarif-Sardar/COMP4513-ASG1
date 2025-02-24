const api = require('../api.js');
const supa = require('@supabase/supabase-js');
const dotenv = require('dotenv').config(); 
const supaUrl = process.env.SUPA_URL;
const supaAnonKey = process.env.SUPA_ANON_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

//get all eras route
const getAllEras = (app) =>
    {
        app.get("/api/eras", async (req, res) => {
        const {data, error} = await supabase
        .from('eras')
        .select();
        res.send(data)
        });
    }
// get all Galleries route
const getAllGalleries = (app) =>
    {
        app.get("/api/galleries", async (req, res) => {
        const {data, error} = await supabase
        .from('galleries')
        .select();
        res.send(data)
        });
    }

//Get a Gallerery route
const getSpecificGallery = (app) =>
    {
        app.get("/api/galleries/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('galleries')
            .select()
            .eq('galleryId',req.params.id);
            if(data.length === 0)//Check if returned empty array
                {
                    res.json("No gallery with that ID");
                }
            else{
                res.send(data)
                }
        });
    
    }
//Get gallery by country.
const getCountryGallery = (app) =>
    {
        app.get("/api/galleries/country/:substring" , async (req, res) => {
        const {data, error} = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry',`${req.params.substring}%`);
        if(data.length === 0)//Check if returned empty array
            {
                res.json("No gallery country with with those characters");
            }
        else{
            res.send(data)
            }
        });
    }
module.exports = {
    getAllEras,
    getAllGalleries,
    getSpecificGallery,
    getCountryGallery
    };
    