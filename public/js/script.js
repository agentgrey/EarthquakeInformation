// Create a map instance and specify the center and zoom level 
var map = L.map('map').setView([0, 115], 4.3);

// Add a tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Himadri Nayak &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Fetch the earthquake data from the API
const url = '/earthquake'; // Proxy endpoint
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Process the earthquake data and add markers to the map
    // console.log(data);  
    data.Infogempa.gempa.forEach((gempa) => {
      var marker = L.marker([
        parseFloat(gempa.Lintang),
        parseFloat(gempa.Bujur),
      ]).addTo(map);
      marker.bindPopup(
        `<b>Magnitude:</b> ${gempa.Magnitude}<br>
        <b>Latitude:</b> ${gempa.Lintang}<br>
        <b>Latitude:</b> ${gempa.Bujur}<br>
        <b>Region:</b> ${gempa.Wilayah}`
      );
    });
  })
  .catch((error) => {
    console.error('Error fetching earthquake data:', error);
  });
