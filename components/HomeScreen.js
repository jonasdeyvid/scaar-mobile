import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginForm from './LoginForm';
import ListagemLeituras from './ListagemLeituras'

export default function HomeScreen({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <LoginForm navigation={navigation} />;
  }

  return (
    <ListagemLeituras user={user} navigation={navigation}/>
  );
}
