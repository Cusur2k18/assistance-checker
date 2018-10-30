import { AsyncStorage } from 'react-native'

class Api {

  constructor() {
    this._request = require('superagent')
    // this._request.set('Content-Type', 'application/json')
    return this._request
  }

  async isSecure() {
    try {
      const token = await AsyncStorage.get('token')
      this._request.set({
        'Authorization': token
      })
    } catch (error) {
       // Error retrieving data
    }
    return this._request
  }

}

export default new Api()