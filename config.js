// Module for connection variables to db
const dotenv = require('dotenv'); 
dotenv.config();
module.exports =
{
    supaUrl: process.env.SUPA_URL,
    supaAnonKey: process.env.SUPA_ANON_KEY
}