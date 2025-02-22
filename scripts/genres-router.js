const supa = require('@supabase/supabase-js');
const supaUrl = 'https://xepgwmitcygbgwpttelv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGd3bWl0Y3lnYmd3cHR0ZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjYwODYsImV4cCI6MjA1NTYwMjA4Nn0.gksC0938ccPA8TsqpdxH--TprNp54gQFgvle3I45gLk';
const supabase = supa.createClient(supaUrl, supaAnonKey);


const getAllGenres = (app) =>
    {
        app.get("/api/genres", async (req, res) => {
        const {data, error} = await supabase
        .from('genres')
        .select('*, eras (*)');
        res.send(data)
        });
    }
//Get a Artists
const getSpecificGenre = (app) =>
    {
        app.get("/api/genres/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('genres')
        .select('*, eras (*)')
        .eq('genreId', req.params.id);
        res.send(data)
        });
    }
const getGenresOfPainting = (app) =>
    {
        app.get("/api/genres/painting/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('genres')
        .select('genreName ,paintinggenres!inner(genreId, paintingId)')
        .eq('paintinggenres.paintingId', req.params.id)
        .order('genreName', {ascending:true});
        res.send(data)
        });
    }

module.exports = {
    getAllGenres,
    getSpecificGenre,
    getGenresOfPainting
    };