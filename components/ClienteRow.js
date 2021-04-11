import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

const ClienteRow = ({navigation, cliente}) => {
  return (
  <View>
      <Text>{cliente.nome}</Text>
  </View>
  );
}

export default ClienteRow;