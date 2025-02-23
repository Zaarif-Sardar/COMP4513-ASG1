const supa = require('@supabase/supabase-js');
const supaUrl = 'https://xepgwmitcygbgwpttelv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGd3bWl0Y3lnYmd3cHR0ZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjYwODYsImV4cCI6MjA1NTYwMjA4Nn0.gksC0938ccPA8TsqpdxH--TprNp54gQFgvle3I45gLk';
const supabase = supa.createClient(supaUrl, supaAnonKey);

const getPatintingsBasedOnGenreID = (app) =>
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
const getPatintingsBasedOnEras = (app) =>
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
        getPatintingsBasedOnGenreID,
        getPatintingsBasedOnEras
        };