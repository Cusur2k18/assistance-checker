import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner, Permissions, Audio } from 'expo'
import { Subheading, Card, Modal, Button, ActivityIndicator, Avatar, Title } from 'react-native-paper'

import EnrollmentService from '../../util/services/enrollment'

export default class App extends React.Component {
  state = {
    hasPermissionsGranted: null,
    type: BarCodeScanner.Constants.Type.back,
    readCode: true,
    visibleModal: false,
    loading: false
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermissionsGranted: (status === 'granted') });
  }

  onCodeRead = async ({ data }) => {
    this.setState({ loading: true, readCode: false })
    const soundObject = new Audio.Sound();

    setTimeout(async () => {
      try {
        await soundObject.loadAsync(require('../../../assets/light.mp3'));
        await soundObject.playAsync();
        this.setState({ loading: false, visibleModal: true })
      } catch (error) {
        alert('error playing audio')
      }
    }, 3000)

    // const { enrollId } = JSON.parse(data)
    // const result = await EnrollmentService.checkAssistance(enrollId)
    // if (result) {
    //   this.setState({ loading: false, visibleModal: true })
    // } else {
    //   alert('Upps! algo ocurrio, intenta otra vez, si el problema persiste verifica con el administrador')
    //   this.setState({ loading: false, readCode: true })
    // }
  }

  hideDialog = () => {
    this.setState({ visibleModal: false, readCode: true })
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Recolectando los permisos necesarios</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No hay permiso para usar la camara</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.state.readCode ? this.onCodeRead : undefined }
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.qr,
          ]}
          type={this.state.type}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={styles.qrContainer}
          onPress={() => this.setState({ type:
            this.state.type === BarCodeScanner.Constants.Type.back
              ? BarCodeScanner.Constants.Type.front
              : BarCodeScanner.Constants.Type.back,
          })}
        >
          <View style={styles.selectableArea}></View>
        </View>
        <View style={{
          width: '100%'
        }}>
          <Card>
            <Card.Content>
              {this.state.loading ? <ActivityIndicator animating={true} /> 
                : <Subheading>Escanea el codigo QR para marcar la asistencia</Subheading>}
            </Card.Content>
          </Card>
        </View>
        <Modal
          visible={this.state.visibleModal}
          onDismiss={this.hideDialog}
          contentContainerStyle={styles.centerAll} >
            <Avatar.Icon icon="done" />
            <Title style={styles.withTop}>Listo!</Title>
            <Button onPress={this.hideDialog}>Continuar con registro</Button>
        </Modal>
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
  },
  qrContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  centerAll: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingVertical: 10
  },
  withTop: {
    marginTop: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
