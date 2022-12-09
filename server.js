const PORT = 8000;
const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const app = express();
require('dotenv').config()
app.use(cors())

app.get('/flights', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.aviationstack.com/v1/flights', 
        aviationKey: process.env.ACCESS_KEY,
        aviationStackHost: 'https://api.aviationstack.com/'
    }
    axios.get(options.url, options.aviationKey).then(response => {
        if (Array.isArray(response.data['results'])) {
            response.data['results'].forEach(flight => {
                if (!flight['live']['is_ground']) {
                    console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
                    `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
                    `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
                }
            });
        }
        // display first ten flights 
        res.json(response.data.slice(0, 6));
    }).catch(error => {
        console.log(error);
    })
});

// listen to changes on PORT 
app.listen(PORT, () => console.log('running on PORT ' + PORT))