const supa = require('@supabase/supabase-js');
const env = require('../config.js');
const supaUrl = env.supaUrl;
const supaAnonKey = env.supaAnonKey;
const supabase = supa.createClient(supaUrl, supaAnonKey);

//Route to get painting based on genre sorted by year of work.
const getPaintingsBasedOnGenreID = (app) =>
    {
        app.get("/api/paintings/genre/:gId", async (req, res) => {
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, title, yearOfWork, paintinggenres!inner(genreId)`)
        .eq('paintinggenres.genreId', req.params.gId)
        .order('yearOfWork',{ascending:true});
        if(data.length === 0)
        {
            res.json("No genre with with the id");
        }
        else{
        res.send(data)
        }
        });
    }
//Route to get paintings based on era id
const getPaintingsBasedOnEras = (app) =>
    {
        app.get("/api/paintings/era/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, title, yearOfWork, paintinggenres!inner(genreId, genres!inner(eras!inner(eraId)))`)
        .eq('paintinggenres.genres.eras.eraId',req.params.id)
        .order('yearOfWork',{ascending:true});
        if(data.length === 0)
            {
                res.json("No eras with that id");
            }
        else{
            res.send(data)
            }
        });
    }

    module.exports = {
        getPaintingsBasedOnGenreID,
        getPaintingsBasedOnEras
        };