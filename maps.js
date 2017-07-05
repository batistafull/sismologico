      var map;
      function initMap() {
   var styleArray =  [
 {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7c93a3"
            },
            {
                "lightness": "-10"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a0a4a5"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#62838e"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dde3e3"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#3f4a51"
            },
            {
                "weight": "0.30"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#bbcacf"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "color": "#bbcacf"
            },
            {
                "weight": "0.50"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a9b4b8"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": "-7"
            },
            {
                "lightness": "3"
            },
            {
                "gamma": "1.80"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a3c7df"
            }
        ]
    }
];
    var rd = {lat: 18.9452078, lng: -70.7282545};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: rd,
          styles: styleArray,
          zoomControl: false,
         scaleControl: true,
         disableDefaultUI: true
        });
        var script = document.createElement('script');
        script.src = 'http://sismologico.uasd.edu.do/?page_id=9';
        document.getElementsByTagName('head')[0].appendChild(script);

      var marker, i;
      var modal = function(con){
        return "#modal"+(con+1);
       }
      window.eqfeed_callback = function(results) {
     for (i = 0; i < results.datos.length; i++) { 
         var a = moment(new Date(), 'DD');
         var ah = moment(new Date(), 'HH');
          var b = moment(results.datos[i]._sismo_fecha[0]+' '+results.datos[i]._sismo_tiempo[0]);
          var magn = function(){
            return results.datos[i]._sismo_magnitud[0];
          }
          var color = function(){
            var c = ah.diff(b, 'hours');
            if(c<2){ return 'red'; 
            }else if(c<24){ return 'orange';
            }else if(c<193){ return 'yellow'; 
            }else{return '#cfd8dc'; }
              };
        var wc = a.diff(b, 'days');
        var bb = a.diff(b, 'days');
        if(wc<=7){
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(results.datos[i]._sismo_lat[0],results.datos[i]._sismo_lng[0]),
        map: map,
        modal : modal(i),
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: magn()*1.5,
            fillColor: color(),
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 0.5
        },
        draggable: false,
      });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
      $('.cuadro').css({"display" : "none"});
     $(marker.modal).css({"position":" fixed", "bottom":"10px", "left": "10px","display": "block"});
      }
    })(marker, i));
    }
  }
  }
}
