import React from 'react';
import { Button, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    hasPermissionsGranted: null,
    type: BarCodeScanner.Constants.Type.back,
    showInfo: false
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermissionsGranted: (status === 'granted') });
  }

  onCodeRead = ({ data }) => {
    this.setState({ showInfo: true })
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
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.state.showInfo ? undefined : this.onCodeRead}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.qr,
          ]}
          type={this.state.type}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={{
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
            width: '100%'
          }}
          onPress={() => this.setState({ type:
            this.state.type === BarCodeScanner.Constants.Type.back
              ? BarCodeScanner.Constants.Type.front
              : BarCodeScanner.Constants.Type.back,
          })}
        >
          <Text style={styles.instructions}> Escanea el codigo QR para marcar la asistencia </Text>
          <View style={styles.selectableArea}></View>
        </View>
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
    paddingTop: 50
  },
  selectableArea: {
    borderColor: 'red',
    borderWidth: 2,
    height: 200,
    width: 200,
    marginTop: '40%'
  },
  instructions: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    paddingVertical: 15,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,0.6)'
  }
});
