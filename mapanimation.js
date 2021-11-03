mapboxgl.accessToken = 'pk.eyJ1IjoidGRoYXIiLCJhIjoiY2t1eDN5bm04MXVwajJ3bnk5ZWR5b2gxdSJ9.l709U5FbGDfLoiXpUrtYIA'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-71.104081, 42.365554],  
    zoom: 13
});

var marker = new mapboxgl.Marker()
  .setLngLat([-71.11669475127161,42.377019707626076])
  .addTo(map);

  var marker = new mapboxgl.Marker()
  .setLngLat([ -71.092761, 42.357575])
  .addTo(map);

  const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
  ];

  //move marker along corrdinates
  var counter = 0;
  function move() {
    setTimeout(() =>{
      if(counter >=busStops.length) return;
      marker.setLngLat(busStops[counter]);
      counter++;
      move();
    }, 500);

  }
  // Get real-time data from MBTA ( Console)
  async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	// timer - Running every 15 sec from MBTA API server
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();