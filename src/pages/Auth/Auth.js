import React, { Component } from 'react';
import { 
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import AuthService from '../../util/services/auth'

const styles = StyleSheet.create({
  button: {}
})

export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '' 
    };
  }

  onLogin = () => {
    console.log('do Login')
    AuthService.login(this.state)
  }

  calis = () => {
    AuthService.calis()
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40}}
          placeholder="Nombre de usuario"
          onChangeText={(text) => this.setState({ username: text })}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Contraseña"
          onChangeText={(text) => this.setState({ password: text })}
          autoCapitalize={'none'}
          autoCorrect={false}
        />

        <TouchableOpacity onPress={this.onLogin}>
          <Text>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.calis}>
          <Text>Calar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
