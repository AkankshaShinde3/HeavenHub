maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
  container: 'map', 
  style: maptilersdk.MapStyle.STREETS,
  center: [72.8777, 19.0760 ], 
  zoom: 14
});

let marker;

async function geocodeAndMark(location) {
  const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${mapToken}`);
  const data = await response.json();
  if (data.features && data.features.length > 0) {
    const [lng, lat] = data.features[0].center;
    map.setCenter([lng, lat]);
    if (marker) marker.remove();
    marker = new maptilersdk.Marker().setLngLat([lng, lat]).addTo(map);
  }
}

const locationInput = document.getElementById('locationInput');

if (locationInput) {
  locationInput.addEventListener('change', (e) => {
    const location = e.target.value;
    if (location) {
      geocodeAndMark(location);
    }
  });
} 
else if (typeof listingLocation !== 'undefined' && listingLocation.trim() !== '') {
  geocodeAndMark(listingLocation);
}
