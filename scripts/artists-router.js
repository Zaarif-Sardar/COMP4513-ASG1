const supa = require('@supabase/supabase-js');
const supaUrl = 'https://xepgwmitcygbgwpttelv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGd3bWl0Y3lnYmd3cHR0ZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjYwODYsImV4cCI6MjA1NTYwMjA4Nn0.gksC0938ccPA8TsqpdxH--TprNp54gQFgvle3I45gLk';
const supabase = supa.createClient(supaUrl, supaAnonKey);


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
        if(data.length === 0)
            {
                res.json("No Artist with with that ID");
            }
        else{
            res.send(data)
            }
        });
    }

const getSpecificArtistSubtring = (app) =>
    {
        app.get("/api/artists/search/:substring", async (req, res) => {
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('lastName',`${req.params.substring}%`);
        if(data.length === 0)
            {
                res.json("No Artist with with that in their last name");
            }
        else{
            res.send(data)
            }
        });
    }
const getArtistSubtringCountry = (app) =>
    {
        app.get("/api/artists/country/:substring", async (req, res) => {
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('nationality',`${req.params.substring}%`);
        if(data.length === 0)
            {
                res.json("No artist nationality with with those characters");
            }
        else{
            res.send(data)
            }
        });
    }

module.exports = {
    getAllArtists,
    getSpecificArtist,
    getSpecificArtistSubtring,
    getArtistSubtringCountry
    };