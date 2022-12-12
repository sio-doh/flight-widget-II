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
        url: 'https://gibraltar-airport-feed.p.rapidapi.com/departures',
        headers: {
            'X-RapidAPI-Key': process.env.API_ACCESS_KEY,
            'X-RapidAPI-Host': 'gibraltar-airport-feed.p.rapidapi.com'
        }
    };
    axios.request(options).then((response) => {
        console.log(response.data); 
        // display first ten flights
        // res.json(response.data.isString().slice(0,10));
    }).catch((error) => {
        console.error(error);
    });
})

// listen to changes on PORT 
app.listen(PORT, () => console.log('running on PORT ' + PORT))