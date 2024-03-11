const address = 'Khilgaon, Dhaka';

const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);
      console.log(latitude, longitude);

      // Now you have the latitude and longitude to use with LeafletJS
    } else {
      console.error('Geocoding failed: No results');
    }
  })
  .catch(error => {
    console.error('Error fetching geocoding data:', error);
  });

  const map = L.map('map').setView([latitude, longitude], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([latitude, longitude]).addTo(map)
  .bindPopup('Your Address Here')
  .openPopup();


