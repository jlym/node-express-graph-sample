const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database('./resources/birds.db');

// Configure express to serve static files from the `public` directory.
// E.g. When browser loads `/graphs.js`, the server will serve the file at `public/graph.js`
app.use(express.static('public'));

/**
 * Fetches all the bird species in the database.
 * Returns a json object of the form
 * { 
 *   data: ["species1", "species2", "species3"]
 * }
 */
app.get('/species', (req, res) => {
    console.log(`Running handler for ${req.url}`)

    console.log(`Querying database for species data.`);
    const query = `
        SELECT DISTINCT(species)
        FROM birds
        ORDER BY species ASC;`
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        const allSpecies = [];
        for (const row of rows) {
            allSpecies.push(row["species"]);
        }

        // Send the data as JSON in the response
        res.json({ data: allSpecies });
    });
});

/**
 * Requires there to be a `species` query paramter.
 * Returns data of the form,
 * {
 *   "species": "the species in the query param",
 *   "data": [
 *      { "year": 2021, "count": 5 },
 *      { "year": 2019, "count": 3 },
 *    ]
 * }
 */
app.get('/population', (req, res) => {
    console.log(`Running handler for ${req.url}`)
    // Extract and validate the request paramters.
    const species = req.query.species;    
    if (!species) {
      res.status(400).json({ error: 'Expected species query paramter to be populated'});
      return;
    }

    console.log(`Querying database for population data. species=${species}`);
    const query = `
        SELECT year, count
        FROM birds
        WHERE species = :species
        ORDER BY year DESC;`
    db.all(query, { ":species": species }, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // Send the data as JSON in the response
        res.json({
            species,
            data: rows,
        });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Do any clean up when we tell the process to stop.
// Code copied from "Example Graceful Shutdown" on https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html/
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing express')
    server.close(() => {
        // Close the database.
        db.close();
    });
});
