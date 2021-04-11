import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import CadastroCliente from './CadastroCliente'
import CadastroLeitura from './CadastroLeitura'
import ListagemCliente from './ListagemCliente'
import ListagemLeituras from './ListagemLeituras'
import LoginForm from './LoginForm'
import UsuarioForm from './UsuarioForm'
import HomeScreen from './HomeScreen'
import ClienteRow from './ClienteRow'


const MainStack = createStackNavigator()


function MainStackScreens() {
    return(
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Screen 
                    name = 'HomeScreen'
                    component = {HomeScreen}
                    options = {{headerShown:false}}
                />
                <MainStack.Screen 
                    name = 'LoginForm'
                    component = {LoginForm}
                    options = {{headerShown:false}}
                />
                <MainStack.Screen 
                    name = 'UsuarioForm'
                    component = {UsuarioForm}
                    options = {{headerShown:false}}
                />
                <MainStack.Screen 
                    name = 'CadastroCliente'
                    component = {CadastroCliente}
                    options = {{headerShown:false}}
                />
                <MainStack.Screen 
                    name = 'CadastroLeitura'
                    component = {CadastroLeitura}
                    options = {{headerShown:false}}
                />
                <MainStack.Screen 
                    name = 'ListagemLeituras'
                    component = {ListagemLeituras}
                    options = {{headerShown:false}}
                />
                <MainStack.Screen 
                    name = 'ListagemCliente'
                    component = {ListagemCliente}
                    options = {{headerShown:false}}
                />
                <MainStack.Screen 
                    name = 'ClienteRow'
                    component = {ClienteRow}
                    options = {{headerShown:false}}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}


export default MainStackScreens