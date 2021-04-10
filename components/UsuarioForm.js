import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';
import {Card, CardItem, MyButton, MyInput, MySpinner} from './common';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('users');

export default class UsuarioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nome: '',
      error: null,
      loading: false,
    };
  }

  cadastroButtonAction = () => {
    auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(data => {
      console.log(data);
      usersCollection
        .doc(data.user.uid)
        .set({name: this.state.nome, email: data.user.email}).then(async () => {
            await alert('Usuário criado com sucesso!')
            this.props.navigation.navigate('HomeScreen', {})
        });
    }) //createUserWithEmailAndPassword
    .catch(error => {
      console.log(error.message);
      this.setState({error: error.message});
    })
  };

  renderButtonCadastro() {
    return (
      <View>
        <MyButton title="Cadastrar-se" onPress={this.cadastroButtonAction} style={{ width: '100%' }} />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Card>
        <CardItem>
            <MyInput
              label="Nome"
              placeholder="Insira seu nome"
              onChangeText={nome => this.setState({nome})}
            />
          </CardItem>
          <CardItem>
            <MyInput
              label="E-mail"
              placeholder="Insira seu e-mail"
              onChangeText={email => this.setState({email})}
            />
          </CardItem>
          <CardItem>
            <MyInput
              label="Senha"
              placeholder="Insira sua senha"
              onChangeText={password => this.setState({password})}
            />
          </CardItem>
          <CardItem
            style={{flexDirection: 'column', alignItems: 'center'}}></CardItem>
        </Card>
        <View style={{ padding: 10 }}>
          {this.renderButtonCadastro()}
        </View>
      </View>
    );
  }
}
