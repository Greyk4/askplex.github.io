!function(e,t){"use strict";t.mobileCheck=function(){return(t.innerWidth>0?t.innerWidth:screen.width)<=768};var l={new:function(t){var r=t.find(".marker"),o={zoom:2,center:new google.maps.LatLng(0,0),mapTypeId:google.maps.MapTypeId.ROADMAP,navigationControl:!1,mapTypeControl:!1,scaleControl:!1,draggable:!1,scrollwheel:!1,disableDefaultUI:!0,clickable:!1,styles:[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#868C96"},{lightness:0}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#f9f9f9"},{lightness:0}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#f9f9f9"},{lightness:0}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#f9f9f9"},{lightness:0},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#ffffff"},{lightness:1}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#f9f9f9"},{lightness:0}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#f9f9f9"},{lightness:1}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#f9f9f9"},{lightness:1},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#f9f9f9"},{lightness:0}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#f9f9f9"},{lightness:0}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#e1e4e7"},{lightness:1}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#f9f9f9"},{lightness:0}]}]};mobileCheck()&&(o.zoom=80);var a=new google.maps.Map(t[0],o);return a.markers=[],r.each(function(){l.addMarker(e(this),a)}),l.centerMap(a),a},addMarker:function(e,t){var l=new google.maps.LatLng(e.attr("data-lat"),e.attr("data-lng")),r=new google.maps.Marker({position:l,map:t,icon:{path:google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:"#FF9900",fillColor:"#FF9900",strokeOpacity:.8,strokeWeight:0,fillOpacity:.4}});t.markers.push(r)},centerMap:function(t){var l=new google.maps.LatLngBounds;e.each(t.markers,function(e,t){var r=new google.maps.LatLng(t.position.lat(),t.position.lng());l.extend(r)}),1==t.markers.length?(t.setCenter(l.getCenter()),t.setZoom(30)):mobileCheck()&&t.fitBounds(l)}},r=null;e(document).ready(function(){e(".acf-map").each(function(){r=l.new(e(this))})})}(jQuery,window);