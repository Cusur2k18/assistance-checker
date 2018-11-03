import { createStackNavigator } from 'react-navigation';
import { Auth, Scanner } from './src/pages'

export default createStackNavigator(
  {
    Auth: {
      screen: Auth
    },
    Scanner: {
      screen: Scanner
    }
  }, 
  {
    navigationOptions: {
      header: null,
    },
    initialRouteName: 'Scanner'
  }
);