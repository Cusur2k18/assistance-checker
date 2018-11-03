import { AsyncStorage } from 'react-native'
import API from '../api'

export default class AuthService {

  static getUrl(part = '') {
    return `http://localhost:5000/api/managers${part}`
  }

  static async login (loginData) {
    const url = `${AuthService.getUrl('/login')}`
    try {
      const data = await API.post(url).query({ include: 'user' }).send(loginData)
      await AsyncStorage.setItem('token', data.body.id);
      await AsyncStorage.setItem('loginData', JSON.stringify(data.body));
      return true
    } catch (error) {
      console.log('error login')
      console.log({ error })
      return false
      
    }
  }
}