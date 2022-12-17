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
        console.log(response.data.collection.items[0].data[0].value);
    }).catch((error) => {
        console.error(error);
    });
})

// listen to changes on PORT 
app.listen(PORT, () => console.log('running on PORT ' + PORT))