import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Taximetro from './Vistas/Taximetro';
import Home from './Vistas/Home'; 
import TarifaFinal from './Vistas/TarifaFinal';

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
  screen: Home
},
Taximetro: {
screen: Taximetro
},
TarifaFinal: {
  screen:TarifaFinal
}
});

export default createAppContainer(AppNavigator);