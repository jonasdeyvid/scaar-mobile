import React, {useState} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import { MyButton } from './common/MyButton';

// import { Container } from './styles';

const ListagemClientes = ({navigation, user}) => {
  //   const [user, setUser] = useState();
  const logout = () => {
    console.log('fazendo logout');
    auth().signOut();
  };
  console.log(auth().currentUser);
  //   setUser(auth.currentUser);

  return (
    <View>
      <Text>listagem de clientes</Text>
      <View>
        <Text onPress={logout}>Welcome {user.email}</Text>
      </View>
      <View>
        <MyButton
          title="Adicionar cliente"
          onPress={() =>
            navigation.navigate('CadastroCliente', {navigation})
          }
        />
      </View>
    </View>
  );
};

export default ListagemClientes;
