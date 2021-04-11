import React, {Component} from 'react';
import {View, Text } from 'react-native';

import {Header} from './components/common';
import LoginForm from './components/LoginForm';
import Routes from './components/Routes';

import { SafeAreaProvider } from 'react-native-safe-area-context'

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    );
  }
}
