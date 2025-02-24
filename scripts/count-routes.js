const supa = require('@supabase/supabase-js');
require("dotenv").config(); 
const dotenv = require('dotenv').config(); 
const supaUrl = process.env.SUPA_URL;
const supaAnonKey = process.env.SUPA_ANON_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

//Route to get count of paintings per genre
const getPatintingsCountPerGenre = (app) =>
    {
        app.get("/api/count/genres", async (req, res) => {
        const {data,error} = await supabase
        .from('genres')
        .select(`genreName, paintingsCount:paintinggenres!inner(count)`)
        //.order('paintingsCount',{ referencedTable: 'paintinggenres' , ascending: true });
        res.send(data)
        });
    }

//Route to get count of paintings per artist
const getPatintingsCountPerArtist = (app) =>
        {
            app.get("/api/count/artists", async (req, res) => {
            const {data, error} = await supabase
            .from('artists')
            .select(`firstName,lastName, paintings!inner(count)`);
            //.order('paintinggenres(count)',{ referencedTable: 'paintinggenres' , ascending: true });
            res.send(data)
            });
        }
//Route to get count of top genres based on input
const getTopGenres = (app) =>
        {
            app.get("/api/count/topgenres/:ref", async (req, res) => {
            const {data, error} = await supabase
            .from('genres')
            .select(`genreName, paintinggenres!inner(count)`)
            //.gt('paintinggenres(count)', req.params.ref);
            //.order('paintinggenres(count)',{ referencedTable: 'paintinggenres' , ascending: true });
            if(data.length === 0)
                {
                    res.json("No genre with with more than ");
                }
            else{
                res.send(data)
                }
            });
        }

module.exports = {
    getPatintingsCountPerGenre,
    getPatintingsCountPerArtist,
    getTopGenres
    };