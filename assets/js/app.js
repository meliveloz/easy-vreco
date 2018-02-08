
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {
      lat: -9.1191427, 
      lng: -77.0349046}, 
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });
  function buscar() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(exito, error);
    }
  }
  var icon1 = {
    url: 'assets/images/bike.png',
    scaledSize: new google.maps.Size(40, 40), 
    origin: new google.maps.Point(0, 0), 
    anchor: new google.maps.Point(20, 40)
  };

  function exito(rta) {
    var latitud = rta.coords.latitude;
    var longitud = rta.coords.longitude;
    var myposition = new google.maps.Marker({
      position: {
        lat: latitud, 
        lng: longitud},    
      animation: google.maps.Animation.BOUNCE,
      map: map,
      title: 'usted esta aca',
      icon: icon1
    });
    map.setZoom(17);
    map.setCenter({
      lat: latitud, 
      lng: longitud});  
  }
  var error = function(error) {
    alert('tenemos problemas para encontrar ubicación');
  };
  var inputPartida = document.getElementById('punto-partida');
  var inputDestino = document.getElementById('punto-destino');

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

  directionsDisplay.setMap(map);
  var trazarRuta = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);
  
  function makeMarker(position, icon, title) {
    new google.maps.Marker({
      position: position,
      map: map,
      icon: icon1,
      title: title
    });
  }
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var leg = response.routes[ 0 ].legs[ 0 ];
        makeMarker(leg.start_location, icon1, 'Donde estoy');
        makeMarker(leg.end_location, icon1, 'Donde voy');
      } else {
        window.alert('No encontramos una ruta');
      }
    });
  };  
  buscar();
}

