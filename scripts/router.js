const api = require('../api.js');
const supa = require('@supabase/supabase-js');
const supaUrl = 'https://xepgwmitcygbgwpttelv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGd3bWl0Y3lnYmd3cHR0ZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjYwODYsImV4cCI6MjA1NTYwMjA4Nn0.gksC0938ccPA8TsqpdxH--TprNp54gQFgvle3I45gLk';
const supabase = supa.createClient(supaUrl, supaAnonKey);

//get all eras
const getAllEras = (app) =>
    {
        app.get("/api/eras", async (req, res) => {
        const {data, error} = await supabase
        .from('eras')
        .select();
        res.send(data)
        });
    }
// get all Galleries
const getAllGalleries = (app) =>
    {
        app.get("/api/galleries", async (req, res) => {
        const {data, error} = await supabase
        .from('galleries')
        .select();
        res.send(data)
        });
    }

// get all Galleries
const getSpecificGallery = (app) =>
    {
        app.get("/api/galleries/:id", async (req, res) => {
        const {data, error} = await supabase
        .from('galleries')
        .select()
        .eq('galleryId',req.params.id);
        res.send(data)
        });
    }
const getCountryGallery = (app) =>
    {
        app.get("/api/galleries/country/:substring" , async (req, res) => {
        const {data, error} = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry',`%${req.params.substring}%`);
        res.send(data)
        });
    }
module.exports = {
    getAllEras,
    getAllGalleries,
    getSpecificGallery,
    getCountryGallery
    };
    