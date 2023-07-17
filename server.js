/** ---------- IMPORTING PACKAGE ---------- **/
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');


// Access static files from the public folder
app.use(express.static(__dirname + '/public'));

// Setting up the default route to index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

// Proxy endpoint
app.get('/earthquake', async (req, res) => {
  try {
    const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json';

    const response = await axios.get(url);
    const data = response.data; 

    res.json(data);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
  }
});

// Directing the app to the given port 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
