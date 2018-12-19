import { AsyncStorage } from 'react-native'
import API from '../api'

export default class EnrollmentService {

  static getUrl(part = '') {
    return `http://localhost:5000/api/enrollments${part}`
  }

  static async checkAssistance (enrollId) {
    const url = `${AuthService.getUrl(`/${enrollId}`)}`
    try {
      const data = await API.put(url).query({ include: 'user' }).send(JSON.stringify({attended: true}))
      console.log('data', data)
      return true
    } catch (error) {
      console.log('error login')
      console.log({ error })
      return false
    }
  }
}