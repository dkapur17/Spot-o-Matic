const pg = require('pg');
const async = require('async');
require('dotenv').config()

var connectionString = "postgres://alpha:Hackathons123@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=./certs/cc-ca.crt&options=--cluster=hackathon-01-688&sslmode=require"
var pool = new pg.Pool({ connectionString });

const setPreferences = (req, res) => {
    const { id, eatingOut, clubbing, playingGames, watchingMovies, leisureTime } = req.body;
    const query = `INSERT INTO preferences VALUES ('${id}', ${eatingOut.score}, '${eatingOut.variants}', ${clubbing.score}, '${clubbing.variants}', ${playingGames.score}, '${playingGames.variants}', ${watchingMovies.score}, '${watchingMovies.variants}', ${leisureTime.score}, '${leisureTime.variants}');`;

    pool.query(query, (err, result) => {
        if (err)
            return res.send(err)
        return res.send(result);
    });
}

const getPreferences = (req, res) => {
    const { id } = req.body;
    pool.query(`SELECT * FROM preferences WHERE id = '${id}'`, (err, result) => {
        if (err) return res.send(err);
        res.send(result.rows);
    })
}

module.exports = {
    setPreferences,
    getPreferences
};