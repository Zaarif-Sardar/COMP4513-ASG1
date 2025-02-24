//connection to database
const supa = require('@supabase/supabase-js');
require("dotenv").config(); 
const dotenv = require('dotenv').config(); 
const supaUrl = process.env.SUPA_URL;
const supaAnonKey = process.env.SUPA_ANON_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

//Routes for Artists
//Get all Artists
const getAllArtists = (app) =>
    {
        app.get("/api/artists", async (req, res) => {
        const {data, error} = await supabase
        .from('artists')
        .select();
        res.send(data)
        });
    }
//Get a Artists
const getSpecificArtist = (app) =>
    {
        app.get("/api/artists/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('artists')
        .select()
        .eq('artistId', req.params.id);
        if(data.length === 0)//Check if returned empty array 
            {
                res.json("No Artist with with that ID");
            }
        else{
            res.send(data)
            }
        });
    }
//Route to get artist with specific characters 
const getSpecificArtistSubtring = (app) =>
    {
        app.get("/api/artists/search/:substring", async (req, res) => {
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('lastName',`${req.params.substring}%`);
        if(data.length === 0)//Check if returned empty array
            {
                res.json("No Artist with with that in their last name");
            }
        else{
            res.send(data)
            }
        });
    }
//Route to get artist with specific characters in thier nationality  
const getArtistSubtringCountry = (app) =>
    {
        app.get("/api/artists/country/:substring", async (req, res) => {
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('nationality',`${req.params.substring}%`);
        if(data.length === 0)//Check if returned empty array
            {
                res.json("No artist nationality with with those characters");
            }
        else{
            res.send(data)
            }
        });
    }
//export routes 
module.exports = {
    getAllArtists,
    getSpecificArtist,
    getSpecificArtistSubtring,
    getArtistSubtringCountry
    };