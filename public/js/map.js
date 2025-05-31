maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
  container: 'map', 
  style: maptilersdk.MapStyle.STREETS,
  center: [72.8777, 19.0760 ], 
  zoom: 14
});