
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
  function exito(rta) {
    var icon1 = {
      url: 'assets/images/point.png',
      scaledSize: new google.maps.Size(50, 50), 
      origin: new google.maps.Point(0, 0), 
      anchor: new google.maps.Point(0, 0) 
    };
    var latitud = rta.coords.latitude;
    var longitud = rta.coords.longitude;
    var myposition = new google.maps.Marker({
      position: {
        lat: latitud, 
        lng: longitud},    
      animation: google.maps.Animation.DROP,
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

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;


  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta');
      }
    });
  };
  directionsDisplay.setMap(map);
  var trazarRuta = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);
  buscar();
}

