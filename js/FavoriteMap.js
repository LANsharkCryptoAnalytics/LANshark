import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import axios from 'axios';

let favs2 = '';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffee99',
  },
  btntext: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default class FavoriteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: '',
    };
  }

  componentDidMount() {
    axios.get(`http://ec2-54-152-18-28.compute-1.amazonaws.com/getUserFavorites?id=${this.props.user.id}`, {

    }).then((favorites) => {
      favs2 = JSON.stringify(favorites.data);
      this.setState(({
        favs: favorites.data,
      }));
    })
      .catch((error) => { throw error; });
  }


  // Open URL in a browser


  //   let fav =
  //   {name:'Fair Grounds 1',
  //   latitude: 29.9838,
  //   longitude: -90.0811,
  //   wide: "stuff about neighborhood",
  //   narrow: "stuff about stuff",
  //   wideWiki: '',
  //   narrowWiki:'http://www.wikidata.org/entity/Q5429810',
  //   wikiImage:'http://commons.wikimedia.org/wiki/Special:FilePath/Jazzfest07FairgroundGrandstand55.jpg',
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.favs !== '' ? (
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
var favs = ${favs2}
  var map = L.map('map').setView([${String(this.props.lat).slice(0, 9)}, ${String(this.props.long).slice(0, 10)}], 16);
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
  let imgSrc = '';
  let name = '';
  let narrowName = '';
  let wideLink = '';
  let narrowLink = '';
  let wideData = '';
  let narrowData = '';
  if(favs[i].wikiImage){ 
  imgSrc = '<img src="'+favs[i].wikiImage+'" alt="Image" height="100%" width="100%">';
  }if(favs[i].wide){ 
  name = favs[i].wide.split(',');
  name = name[0].slice(1).replace(/("|')/g, "");
  wideData = favs[i].wide.slice(1, -1).replace(/("|')/g, "").split(',').slice(1).join(' ') +'<br>';
  }if(favs[i].narrow){ 
    narrowName = favs[i].narrow.split(',');
    narrowName = '<b>'+narrowName[0].slice(1).replace(/("|')/g, "")+'</b>';
    narrowData = '<div>'+favs[i].narrow.slice(1, -1).replace(/("|')/g, "").split(',').slice(1).join(' ') +'</div>';
    } if(wideData === narrowData) { narrowData = ''; }
  name = "Fav #"+ (i + 1) + " " + name;
  if(favs[i].wideWiki){ 
    wideLink = '<a href="'+favs[i].wideWiki+'">Neighborhood Info</a><br>'
  }if(favs[i].narrowWiki){ 
    narrowLink = '<a href="'+favs[i].narrowWiki+'">POI Info</a><br>'
  }
  
  L.marker([favs[i].lat, favs[i].long], {icon: fIcon}).addTo(map)
.bindPopup('<b>'+name+'</b><br>'+ wideData + wideLink+ imgSrc + narrowName+narrowData + narrowLink

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
              domStorageEnabled
            />
          )
            : (
              <View>
                <Text>Loading</Text>
              </View>
            )}
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
