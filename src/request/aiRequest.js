import axios from 'axios'
export const requset = axios.create({
  baseURL: 'https://xxxx.com/v1',
  timeout: 5000
})
// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: 'Bearer sk-YOUR_API_KEY'
// }
