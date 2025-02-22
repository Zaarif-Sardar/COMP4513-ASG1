const supa = require('@supabase/supabase-js');
const supaUrl = 'https://xepgwmitcygbgwpttelv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGd3bWl0Y3lnYmd3cHR0ZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjYwODYsImV4cCI6MjA1NTYwMjA4Nn0.gksC0938ccPA8TsqpdxH--TprNp54gQFgvle3I45gLk';
const supabase = supa.createClient(supaUrl, supaAnonKey);


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
const getPaintingsSortbyTitleOrYear = (app) =>
    {
        app.get("/api/paintings/sort/:method", async (req, res) => {
        if(req.params.method == 'title')
        {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .order('title', {ascending:true});
            res.send(data)
        }
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
const getSpecificPaintingsId = (app) =>
    {
        app.get("/api/paintings/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('paintings')
        .select('*, artists (*), galleries (*)')
        .eq('paintingId',req.params.id);
        res.send(data)
        });
    }
const getPaintingsbySubtring = (app) =>
    {
        app.get("/api/paintings/search/:substring", async (req, res) => {
        const {data, error} = await supabase
        .from('paintings')
        .select('*, artists!inner (*), galleries!inner(*)')
        .ilike('title',`%${req.params.substring}%`);
        res.send(data)
        });
    }
const getPaintingsYearRange = (app) =>
    {
        app.get("/api/paintings/years/:start/:end", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .gte("yearOfWork", req.params.start)
            .lte("yearOfWork", req.params.end)
            .order("yearOfWork",{ascending:true});
            res.send(data)
            });
    }
const getPaintingsbyGalleryId = (app) =>
    {
        app.get("/api/paintings/galleries/:gId", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .eq("galleryId",req.params.gId)
            res.send(data)
            });
    }
const getPaintingsbyArtistId = (app) =>
    {
        app.get("/api/paintings/artist/:aId", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select('*, artists (*), galleries (*)')
            .eq("artistId",req.params.aId)
            res.send(data)
            });
    }
const getPaintingsbyArtistNationality = (app) =>
    {
        app.get("/api/paintings/artist/country/:substring", async (req, res) => {
            const {data, error} = await supabase
            .from('paintings')
            .select(`*, artists!inner (*), galleries (*)`)
            .ilike('artists.nationality',`${req.params.substring}%`);
            res.send(data)
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