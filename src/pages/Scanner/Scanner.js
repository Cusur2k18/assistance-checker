import React from 'react';
import { Button, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    hasPermissionsGranted: null,
    type: BarCodeScanner.Constants.Type.back,
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermissionsGranted: (status === 'granted') });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={data => alert(JSON.stringify(data))}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.qr,
          ]}
          type={this.state.type}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => this.setState({ type:
            this.state.type === BarCodeScanner.Constants.Type.back
              ? BarCodeScanner.Constants.Type.front
              : BarCodeScanner.Constants.Type.back,
          })}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
