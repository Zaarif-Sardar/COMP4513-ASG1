const supa = require('@supabase/supabase-js');
const supaUrl = 'https://xepgwmitcygbgwpttelv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGd3bWl0Y3lnYmd3cHR0ZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjYwODYsImV4cCI6MjA1NTYwMjA4Nn0.gksC0938ccPA8TsqpdxH--TprNp54gQFgvle3I45gLk';
const supabase = supa.createClient(supaUrl, supaAnonKey);

const getPatintingsCountPerGenre = (app) =>
    {
        app.get("/api/count/genres", async (req, res) => {
        const {data, error} = await supabase
        .from('genres')
        .select(`genreName, paintinggenres!inner(count)`);
        //.order('paintinggenres(count)',{ referencedTable: 'paintinggenres' , ascending: true });
        res.send(data)
        });
    }

module.exports = {
    getPatintingsCountPerGenre,
    };