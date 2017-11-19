import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vuejs-learning-59349.firebaseio.com/'
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
