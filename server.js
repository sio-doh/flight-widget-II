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
            'X-RapidAPI-Key': 'efd348b4f8msh78f11ee34378890p16ba48jsn28ce241816d4',
            'X-RapidAPI-Host': 'gibraltar-airport-feed.p.rapidapi.com'
        }
    }
    
    axios.request(options).then(function(response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    })
})


// listen to changes on PORT 
app.listen(PORT, () => console.log('running on PORT ' + Number)) 
