import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Routes from './routes'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Routes />
          </View>
        </SafeAreaView>
      </PaperProvider>
    );
  }
}
