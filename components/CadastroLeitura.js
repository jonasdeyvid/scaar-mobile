import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';
import {Card, CardItem, MyButton, MyInput, MySpinner} from './common';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const leituraCollection = firestore().collection('leituras');
import moment from 'moment'

export default class CadastroLeitura extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      leitura: '',
      userId: '',
      error: null,
      loading: false,
      cliente: this.props.route.params.cliente
    };
  }

  componentDidMount() {
      console.log(this.props.route.params.cliente.nome)
  }

  cadastroButtonAction = () => {
      let dataLeitura = `${moment().format('YYYYMMDD')}`
      console.log(dataLeitura)
    leituraCollection.add({
        data: dataLeitura,
        leitura: this.state.leitura,
        userId: auth().currentUser.uid,
        clienteId: this.state.cliente.id,
    })
      .then(data => {
        console.log(data);
            alert('Leitura cadastrada com sucesso!');
            this.props.navigation.navigate('HomeScreen', {});
      }) //createUserWithEmailAndPassword
      .catch(error => {
        console.log(error.message);
        this.setState({error: error.message});
      });
  };

  renderButtonCadastro() {
    return (
      <View>
        <MyButton
          title="Cadastrar leitura"
          onPress={this.cadastroButtonAction}
          style={{width: '100%'}}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {this.state.cliente.nome}
            </Text>
          </CardItem>
          <CardItem>
            <MyInput
              label="Leitura"
              placeholder="Insira a leitura"
              onChangeText={leitura => this.setState({leitura})}
            />
          </CardItem>
          <CardItem
            style={{flexDirection: 'column', alignItems: 'center'}}></CardItem>
        </Card>
        <View style={{padding: 10}}>{this.renderButtonCadastro()}</View>
      </View>
    );
  }
}
