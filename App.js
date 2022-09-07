import React from 'react';
import { View, Text, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Taximetro from './Vistas/Taximetro';
import Home from './Vistas/Home'; 
import TarifaFinal from './Vistas/TarifaFinal';
import Contador from './Componentes/Contador';

YellowBox.ignoreWarnings([""]);
class HomeScreen extends React.Component {
render() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Home Screen</Text>
</View>
);
}
}

const AppNavigator = createStackNavigator({
  Home: {
  screen: Home,
  navigationOptions: {
    headerShown:false
   }
},
Taximetro: {
screen: Taximetro,
navigationOptions: {
  headerShown:false
 }
},
TarifaFinal: {
  screen:TarifaFinal,
  navigationOptions: {
    headerShown:false
   }
}
});

export default createAppContainer(AppNavigator);