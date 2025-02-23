const supa = require('@supabase/supabase-js');
const supaUrl = 'https://xepgwmitcygbgwpttelv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGd3bWl0Y3lnYmd3cHR0ZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjYwODYsImV4cCI6MjA1NTYwMjA4Nn0.gksC0938ccPA8TsqpdxH--TprNp54gQFgvle3I45gLk';
const supabase = supa.createClient(supaUrl, supaAnonKey);

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