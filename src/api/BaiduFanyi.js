import axios from 'axios'
import md5 from 'js-md5'
import { useUserKeyStore } from '@/stores'

const BaiduTranslate5 = async (query, appid, key, from, to) => {
  const salt = Date.now() //确保 salt是字符串类型
  const str1 = appid + query + salt + key //拼接字符串1
  const sign = md5(str1) //计算签名

  try {
    const response = await axios.get('/api/baidu', {
      params: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      }
    })
    console.log(response.data)
    return response.data.trans_result
  } catch (error) {
    console.error('翻译失败:', error)
    throw new Error('翻译失败！')
  }
}

const BaiduTranslate = async (query, from, to) => {
  const userKeyStore = useUserKeyStore()
  const appid = userKeyStore.userKeyInfo.BaiduAppid
  const key = userKeyStore.userKeyInfo.BaiduAppKey
  const salt = Date.now()
  const sign = md5(appid + query + salt + key)
  const headers = {
    'Access-Control-Allow-Origin': '*'
  }
  try {
    const response = await axios.get(
      '/api/baidu',
      {
        params: {
          q: query,
          from: from,
          to: to,
          appid: appid,
          salt: salt,
          sign: sign
        }
      },
      headers
    )
    return response.data.trans_result[0].dst
  } catch (error) {
    console.error('翻译失败:', error)
    throw new Error('翻译失败！')
  }
}
const BaiduTranslate1 = async (query, appid, key, from, to) => {
  const salt = Date.now().toString() //确保 salt是字符串类型
  const str1 = appid + query + salt + key //拼接字符串1
  const sign = md5(str1) //计算签名

  try {
    const response = await axios.get('api/baidu', {
      params: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      }
    })
    console.log(response.data)
    return response.data.trans_result
  } catch (error) {
    console.error('翻译失败:', error)
    throw new Error('翻译失败！')
  }
}
export default BaiduTranslate
export { BaiduTranslate1, BaiduTranslate5 }
