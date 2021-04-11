import React, {useState, Component} from 'react';
import {View, Text, Alert, FlatList, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {MyButton, Card, CardItem} from './common';
import firestore from '@react-native-firebase/firestore';
import ClienteRow from './ClienteRow';
import {ScrollView} from 'react-native-gesture-handler';
const clientesCollection = firestore().collection('clientes');

// import { Container } from './styles';

export default class ListagemCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {clientes: []};
  }

  componentDidMount() {
    this.listClientes();
  }

  componentDidUpdate() {
    this.listClientes();
  }

  listClientes() {
    clientesCollection.where('userId', '==', auth().currentUser.uid).get().then(querySnapshot => {
      //console.log('Total users: ', querySnapshot.size);
      let clientes = [];
      querySnapshot.forEach(documentSnapshot => {
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        clientes.push({id: documentSnapshot.id, ...documentSnapshot.data()});
      });
      this.setState({clientes});
    });
  }

  deleteCliente(c) {
    clientesCollection
      .doc(c.id)
      .delete()
      .then(() => {
        console.log('Cliente deleted!');
      });
  }

  showDeleteClienteDialog(c) {
    Alert.alert(
      `Deletar cliente ${c.nome}?`,
      'o cliente será apagado do sistema',
      [
        {
          text: 'Sim',
          onPress: () => this.deleteCliente(c),
        },
        {
          text: 'Não',
          onPress: () => console.log('Yes, discard changes'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  renderClientes = () => {
    return (
      <FlatList
        data={this.state.clientes}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View style={{flex: 1.5}}>
                <Text style={{fontSize: 18}}>{item.nome}</Text>
              </View>
              <View style={{flex: 1}}>
                <MyButton
                  title="Editar"
                  onPress={() => {
                    this.props.navigation.navigate('CadastroCliente', {
                      cliente: item,
                    });
                    console.log(item);
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <MyButton
                  title="Deletar"
                  style={{ backgroundColor: "#f20f0f"}}
                  onPress={() => this.showDeleteClienteDialog(item)}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    return (
      <Card>
        <CardItem>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Clientes</Text>
        </CardItem>
        <CardItem style={{height: '80%'}}>{this.renderClientes()}</CardItem>
        <CardItem>
          <MyButton
          style={{ width: '100%' }}
            title="Cadastrar cliente"
            onPress={() => this.props.navigation.navigate('CadastroCliente', {cliente: {}})}
          />
        </CardItem>
      </Card>
    );
  }
}
