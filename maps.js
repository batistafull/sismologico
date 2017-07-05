      var map;
      function initMap() {
   var styleArray = [
   {"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},
   {"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
   {"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},
   {"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},
   {"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},
   {"featureType":"administrative.country","stylers":[{"color":"#747474"},{"visibility":"on"},{"weight":0.5}]},
   {"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},
   {"featureType":"administrative.province","stylers":[{"color":"#747474"},{"visibility":"on"}]},
   {"featureType":"poi","stylers":[{"visibility":"off"}]},
   {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},
   {"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},
   {"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},
   {"featureType":"road","stylers":[{"visibility":"off"}]},
   {"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},
   {"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
   {"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},
   {"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},
   {"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},
   {"featureType":"transit","stylers":[{"visibility":"off"}]},
   {"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},
   {"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},
   {"featureType":"water","elementType":"geometry","stylers":[{"color":"#a3c7df"}]},
   {"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#a3c7df"}]}];
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
            }else if(c<193){ return '#ffc107'; 
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
            scale: magn()*1.9,
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
