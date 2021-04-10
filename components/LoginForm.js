import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';
import {Card, CardItem, MyButton, MyInput, MySpinner} from './common';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('users');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false,
    };
  }

  signInButtonAction = () => {
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        alert('Usuário ' + user.user.email + ' logado com sucesso!');
        // this.props.navigation.navigate('HomeScreen', {})
      }) //signInWithEmailAndPassword
      .catch(error => {
        console.log(error.message);
        this.setState({error: error.message});
      }); //signInWithEmailAndPassword
  };

  cadastroButtonAction = () => {
      this.props.navigation.navigate('UsuarioForm', { name: 'name'})
  };

  renderButtonLogin() {
    if (this.state.loading) {
      return <MySpinner />;
    }
    return (
      <View>
        <Text style={{fontSize: 14, alignSelf: 'center', color: 'red'}}>
          {this.state.error}
        </Text>
        <MyButton title="Login" onPress={this.signInButtonAction} style={{ width: '100%' }} />
      </View>
    );
  }

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
              label="E-mail"
              placeholder="Entre com seu e-mail."
              onChangeText={email => this.setState({email})}
            />
          </CardItem>
          <CardItem>
            <MyInput
              label="Senha"
              placeholder="Entre com sua senha."
              onChangeText={password => this.setState({password})}
            />
          </CardItem>
          <CardItem
            style={{flexDirection: 'column', alignItems: 'center'}}></CardItem>
        </Card>
        <View style={{ padding: 10 }}>
          {this.renderButtonLogin()}
          {this.renderButtonCadastro()}
        </View>
      </View>
    );
  }
}
