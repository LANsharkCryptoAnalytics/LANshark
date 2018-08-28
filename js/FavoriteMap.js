import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';

export default class FavoriteMap extends Component {
  constructor(props) {
    super(props);
  }

  // Open URL in a browser

  //   loggingIn = () => {
  //     axios.get('http://localhost:8200/map')
  //     .then((data) => alert(data))
  //     .catch((e) => alert(e))
  //   }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <WebView
            source={{
              html: `
              <!DOCTYPE html>
<html>
<head>
	<title>Favorites Map</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==" crossorigin=""></script>


	<style>
		html, body {
			height: 100%;
			margin: 0;
		}
		#map {
			width: 600px;
			height: 400px;
		}
	</style>

	<style>body { padding: 0; margin: 0; } #map { height: 100%; width: 100vw; }</style>
</head>
<body>

<div id='map'></div>

<script>
  var map = L.map('map').setView([${String(this.props.lat).slice(0, 9)}, ${String(this.props.long).slice(0, 10)}], 16);
  let mapLink = "https://query.wikidata.org/embed.html#%23defaultView%3AMap%7B%22layer%22%3A%22%3Finstance_ofLabel%22%7D%0ASELECT%20%3Fplace%20%3FplaceLabel%20%3Fimage%20%3Fcoordinate_location%20%3Fdist%20%3Finstance_of%20%3Finstance_ofLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Aaround%20%7B%0A%20%20%20%20%3Fplace%20wdt%3AP625%20%3Fcoordinate_location.%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Acenter%20%22Point%28-90.0811%20%29%22%5E%5Egeo%3AwktLiteral.%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Aradius%20%221%22.%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Adistance%20%3Fdist.%0A%20%20%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fplace%20wdt%3AP18%20%3Fimage.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fplace%20wdt%3AP31%20%3Finstance_of.%20%7D%0A%7D";
 
  let favs = [
    {title:'Fair Grounds Race Course',
    long:-90.0811,
    lat: 29.9838,
    dist:'0.96',
    type:'sports venue',
    widewiki: '',
    narrowwiki:'http://www.wikidata.org/entity/Q5429810',
    wikiimage:'http://commons.wikimedia.org/wiki/Special:FilePath/Jazzfest07FairgroundGrandstand55.jpg',
  },    
    {
    title: 'Rivoli Theatre',
       long: -90.075462,
       lat: 29.975514,
       type: 'movie theater' 
   },
     {
    title: 'Bell Theatre',
       long: -90.077997,
       lat: 29.979401,
       type: 'movie theater' 
   },
     ];
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/"></a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
  }).addTo(map);
  var LeafIcon = L.Icon.extend({
    options: {
       iconSize: [15, 15],
       popupAnchor:  [0, -15],
    }
});
var fIcon = new LeafIcon({
  iconUrl: 'https://emojipedia-us.s3.amazonaws.com/thumbs/160/apple/81/fleur-de-lis_269c.png',
})
var starIcon = new LeafIcon({
  iconUrl: 'https://www.shareicon.net/download/2017/05/09/885829_star_512x512.png',
})
for( let i = 0; i < favs.length; i++){
  L.marker([favs[i].lat, favs[i].long], {icon: fIcon}).addTo(map)
.bindPopup('<div><b>'+favs[i].title+'</b></div><br>'+'<a href="'+favs[i].narrowwiki+'">Link</a><br>' + '<img src="http://commons.wikimedia.org/wiki/Special:FilePath/Jazzfest07FairgroundGrandstand55.jpg" alt="Image" height="100%" width="100%">'

);
}

    

	L.marker([${String(this.props.lat).slice(0, 9)}, ${String(this.props.long).slice(0, 10)}], {icon: starIcon}).addTo(map)
		.bindPopup("<b>You are here</b><br />");
	var popup = L.popup();
	map.on('click', onMapClick);
</script>



</body>`,
            }}
            style={{ flex: 1 }}
            scalesPageToFit
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} // for iOS
            onNavigationStateChange={this.onShouldStartLoadWithRequest}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => { this.props.showFavMapView(); }}>
            <Text style={styles.btntext}>AR View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({

  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
  },
  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
