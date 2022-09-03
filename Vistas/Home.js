import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Home = (props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <TouchableOpacity style={{ backgroundColor:'orange', padding:10, width:150, justifyContent:"center", alignContent:"center", alignItems:"center" }} onPress={()=> props.navigation.navigate("Taximetro") } >
          <Text style={{ color:'white', fontWeight:'bold' }} >Iniciar</Text>
        </TouchableOpacity>
    </View>
  )
}
export default Home;