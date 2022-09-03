import React from 'react';
import { Text, View } from 'react-native';

const TarifaFinal = (props) => {
    const { params } = props.navigation.state;
    const TarifaTotal = params ? params.TarifaTotal : null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Total a pagar: ${TarifaTotal}</Text>
    </View>
  )
}
export default TarifaFinal;