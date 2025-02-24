const supa = require('@supabase/supabase-js');
require("dotenv").config(); 
const supaUrl = process.env.SUPA_URL;
const supaAnonKey = process.env.SUPA_ANON_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

//Route to return all genres
const getAllGenres = (app) =>
    {
        app.get("/api/genres", async (req, res) => {
        const {data, error} = await supabase
        .from('genres')
        .select('*, eras (*)');
        res.send(data)
        });
    }
//Route to get specific genre based on id
const getSpecificGenre = (app) =>
    {
        app.get("/api/genres/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('genres')
        .select('*, eras (*)')
        .eq('genreId', req.params.id);
        if(data.length === 0)//Check if returned empty array
            {
                res.json("No genre with with the id", req.params.id );
            }
        else{
                res.send(data)
            }
        });
    }
//Route to get genres of painting based on id 
const getGenresOfPainting = (app) =>
    {
        app.get("/api/genres/painting/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('genres')
        .select('genreName ,paintinggenres!inner(genreId, paintingId)')
        .eq('paintinggenres.paintingId', req.params.id)
        .order('genreName', {ascending:true});
        if(data.length === 0)
            {
                res.json("No painting with with the id", req.params.id );
            }
        else{
            res.send(data)
            }
        });
    }

module.exports = {
    getAllGenres,
    getSpecificGenre,
    getGenresOfPainting
    };