/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React from "react";
 import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Platform,
   PermissionsAndroid
 } from "react-native";
 import MapView, {
   Marker,
   AnimatedRegion,
   Polyline,
   PROVIDER_GOOGLE
 } from "react-native-maps";
 import haversine from "haversine";
 import Geolocation from '@react-native-community/geolocation';
 
 // const LATITUDE = 29.95539;
 // const LONGITUDE = 78.07513;
 const LATITUDE_DELTA = 0.009;
 const LONGITUDE_DELTA = 0.009;
 const LATITUDE = 6.341308;
 const LONGITUDE = -75.5625925;
 
 class AnimatedMarkers extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       latitude: LATITUDE,
       longitude: LONGITUDE,
       routeCoordinates: [],
       distanceTravelled: 0,
       prevLatLng: {},
       coordinate: new AnimatedRegion({
         latitude: LATITUDE,
         longitude: LONGITUDE,
         latitudeDelta: 0,
         longitudeDelta: 0
       }),
       cuenta:0,
       valorMinima:3800,
       tarifaFinal:0
     };
   }
 
   componentDidMount() {
     const { coordinate } = this.state;
 
     this.watchID = Geolocation.watchPosition(
       position => {
         const { routeCoordinates, distanceTravelled } = this.state;
         const { latitude, longitude } = position.coords;
 
         const newCoordinate = {
           latitude,
           longitude
         };
 
         this.setState({
           latitude,
           longitude,
           routeCoordinates: routeCoordinates.concat([newCoordinate]),
           distanceTravelled:
             distanceTravelled + this.calcDistance(newCoordinate),
           prevLatLng: newCoordinate
         });
       },
       error => console.log(error),
       {
         enableHighAccuracy: true,
         timeout: 20000,
         maximumAge: 1000,
         distanceFilter: 10
       }
     );
     //enableHighAccuracy: false, cuando se usa para el dispositivo real y en true para el emulador
     //aqui es donde hago el cronometro y hago el calculo de la tarifa final
     setInterval(() => {
      this.setState({cuenta: this.state.cuenta + 1})
      //Tarifa base : 3800
      //Costo por kilometro : 1538
      //Distancia de viaje:  parseFloat(this.state.distanceTravelled).toFixed(2)
      //Total de costo en kilometros :
      let tarifaKilometros = 5800 + (1538 * parseFloat(this.state.distanceTravelled).toFixed(2)) 

      //arranca cuando va en minuto 45 comienza a contar
      //Costo por minuto: 220
      //Tiempo en carro mientras esta parado o va despacio: parseFloat(this.state.cuenta)
      let tarifaTiempo = 220 * parseFloat(this.state.cuenta) / 60
      if(this.state.cuenta >= 84 ){ 
        this.setState({tarifaFinal: parseInt(tarifaKilometros) + parseInt(tarifaTiempo.toFixed(0)) })
      }else{
        this.setState({tarifaFinal: 5800 })
      }
      
     }, 1000);
   }
 
   componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
   }
 
   getMapRegion = () => ({
     latitude: this.state.latitude,
     longitude: this.state.longitude,
     latitudeDelta: LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA
   });
 
   calcDistance = newLatLng => {
     const { prevLatLng } = this.state;
     return haversine(prevLatLng, newLatLng) || 0;
   };
 
   render() {
     return (
       <View style={styles.container}>
         <MapView
           style={styles.map}
           provider={PROVIDER_GOOGLE}
           showUserLocation
           followUserLocation
           loadingEnabled
           region={this.getMapRegion()}
         >
           <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
           <Marker.Animated
             ref={marker => {
               this.marker = marker;
             }}
             coordinate={this.state.coordinate}
           />
         </MapView>
         <View style={styles.buttonContainer}>
           <TouchableOpacity style={[styles.bubble, styles.button]}>
             <Text style={styles.bottomBarContent}>
               {parseFloat(this.state.distanceTravelled).toFixed(2)} km
             </Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.bubble, styles.button]}>
             <Text style={styles.bottomBarContent}>
             Tiempo: {parseFloat(this.state.cuenta)}
             </Text>
           </TouchableOpacity>
         </View>
         <View style={styles.buttonContainer}>
         <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text>Tarifa: ${this.state.tarifaFinal}</Text>
          </TouchableOpacity>
         </View>
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     ...StyleSheet.absoluteFillObject,
     justifyContent: "flex-end",
     alignItems: "center"
   },
   map: {
     ...StyleSheet.absoluteFillObject
   },
   bubble: {
     flex: 1,
     backgroundColor: "rgba(255,255,255,0.7)",
     paddingHorizontal: 18,
     paddingVertical: 12,
     borderRadius: 20
   },
   latlng: {
     width: 200,
     alignItems: "stretch"
   },
   button: {
     width: 80,
     paddingHorizontal: 12,
     alignItems: "center",
     marginHorizontal: 10
   },
   buttonContainer: {
     flexDirection: "row",
     marginVertical: 20,
     backgroundColor: "transparent"
   }
 });
 
 export default AnimatedMarkers;
 