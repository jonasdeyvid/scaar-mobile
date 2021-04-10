import React, {useState} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import { MyInput, MyButton, Card, CardItem } from './common'
import firestore from '@react-native-firebase/firestore';
const clientesCollection = firestore().collection('clientes')

// import { Container } from './styles';

const CadastroCliente = ({navigation}) => {
    const [nome, setNome] = useState()
    const [inscricao, setinscricao] = useState()
    const [hidrometro, setHidrometro] = useState()
    const user = auth().currentUser
  const logout = () => {
    console.log('fazendo logout');
    auth().signOut();
  };
  //   setUser(auth.currentUser);

//   const user = () => auth().currentUser;
  console.log('useeeer', user);

  function cadastroClienteButtonAction() {
      console.log(nome, inscricao, hidrometro)
      const cliente = {
          nome,
          inscricao,
          hidrometro,
          userId: user.uid
      }
      clientesCollection.add(cliente).then(() => {
        alert('Cliente criado com sucesso!')
        navigation.goBack()
      }).catch(err => {
          console.log(err)
          alert('Ocorreu um erro ao cadastrar cliente')
      })

  }

  function renderButtonCadastrarCliente() {
    return (
        <View>
          <MyButton title="Cadastrar cliente" onPress={cadastroClienteButtonAction} style={{ width: '100%' }} />
        </View>
      );
  }

  return (
    <View>
      <Text>cadastro de clientes</Text>
      <View>
        <Text onPress={logout}>Welcome {user.email}</Text>
      </View>
      <View>
        <Card>
          <CardItem>
            <MyInput
              label="Nome"
              placeholder="Nome do cliente"
              onChangeText={nome => setNome(nome)}
            />
          </CardItem>
          <CardItem>
            <MyInput
              label="Inscrição"
              placeholder="Número de inscrição do cliente"
              onChangeText={inscricao => setinscricao(inscricao)}
            />
          </CardItem>
          <CardItem>
            <MyInput
              label="Hidrômetro"
              placeholder="Número do hidrômetro do cliente"
              onChangeText={hidrometro => setHidrometro(hidrometro)}
            />
          </CardItem>
          <CardItem
            style={{flexDirection: 'column', alignItems: 'center'}}></CardItem>
        </Card>
        <View style={{ padding: 10 }}>
          {renderButtonCadastrarCliente()}
        </View>
      </View>
    </View>
  );
};

export default CadastroCliente;
