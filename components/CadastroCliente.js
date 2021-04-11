import React, {useState} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {MyInput, MyButton, Card, CardItem} from './common';
import firestore from '@react-native-firebase/firestore';
const clientesCollection = firestore().collection('clientes');

// import { Container } from './styles';

const CadastroCliente = ({navigation, route}) => {
  const [client = {...route.params.cliente}, setClient] = useState();
  const user = auth().currentUser;
  const logout = () => {
    console.log('fazendo logout');
    auth().signOut();
    navigation.goBack()
  };
  //   setUser(auth.currentUser);

  //   const user = () => auth().currentUser;
  console.log('clienteee', client);
  // if(route.params.cliente) {
  //   setClient(route.params.cliente)
  //   console.log('clienteee', route.params.cliente)
  // }

  function cadastroClienteButtonAction() {
    const nomeMensagem = client.id ? 'editado' : 'cadastrado';
    if (!client.id) {
      clientesCollection
        .add({...client, userId: user.uid})
        .then(() => {
          alert(`Cliente ${nomeMensagem} com sucesso!`);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
          alert('Ocorreu um erro ao cadastrar cliente');
        });
    } else {
      clientesCollection
        .doc(client.id)
        .set({...client, userId: user.uid})
        .then(() => {
          alert(`Cliente ${nomeMensagem} com sucesso!`);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
          alert('Ocorreu um erro ao cadastrar cliente');
        });
    }
  }

  function renderButtonCadastrarCliente() {
    const nomeBotao = client.id ? 'Editar Cliente' : 'Cadastrar cliente';
    return (
      <View>
        <MyButton
          title={nomeBotao}
          onPress={cadastroClienteButtonAction}
          style={{width: '100%'}}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Cadastro de clientes</Text>
      <View>
        <Card>
          <CardItem>
            <MyInput
              label="Nome"
              placeholder="Nome do cliente"
              value={client.nome}
              onChangeText={nome => setClient({...client, nome})}
            />
          </CardItem>
          <CardItem>
            <MyInput
              label="Inscrição"
              value={client.inscricao}
              placeholder="Número de inscrição do cliente"
              onChangeText={inscricao => setClient({...client, inscricao})}
            />
          </CardItem>
          <CardItem>
            <MyInput
              label="Hidrômetro"
              placeholder="Número do hidrômetro do cliente"
              value={client.hidrometro}
              onChangeText={hidrometro => setClient({...client, hidrometro})}
            />
          </CardItem>
          <CardItem
            style={{flexDirection: 'column', alignItems: 'center'}}></CardItem>
        </Card>
        <View style={{padding: 10}}>{renderButtonCadastrarCliente()}</View>
      </View>
    </View>
  );
};

export default CadastroCliente;
