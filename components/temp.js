// import React, { useState, useEffect } from 'react';
// import L from 'leaflet';

// function LeafletMapModal() {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const address = 'Khilgaon, Dhaka'; // Change this to the desired address

//   useEffect(() => {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         if (data.length > 0) {
//           const lat = parseFloat(data[0].lat);
//           const lon = parseFloat(data[0].lon);
//           setLatitude(lat);
//           setLongitude(lon);
//         } else {
//           console.error('Geocoding failed: No results');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching geocoding data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (latitude !== null && longitude !== null) {
//       const map = L.map('map').setView([latitude, longitude], 13);

//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(map);

//       L.marker([latitude, longitude]).addTo(map)
//         .bindPopup('Tuition Address')
//         .openPopup();
//     }
//   }, [latitude, longitude]);

//   return (
//     <div>
//       <div id="map" style={{ width: '100%', height: '300px' }}></div>
     
//     </div>
//   );
// }

// export default LeafletMapModal;
