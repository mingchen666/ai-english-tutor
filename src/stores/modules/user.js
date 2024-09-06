import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserInfoStore = defineStore(
  'User-Info',
  () => {
    const userInfo = ref({
      avatar:
        'https://img0.baidu.com/it/u=1208473977,1439774356&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      nickname: '小罗',
      userId: '12345',
      registrationTime: '2024-01-01',
      userType: '普通用户',
      password: '12345678',
      email: 'cs@xxx.com'
    })

    const setUserInfo = (newUserInfo) => {
      userInfo.value = { ...newUserInfo }
    }
    const setNewPassword = (newPassword) => {
      userInfo.value.password = newPassword
    }

    return { userInfo, setUserInfo, setNewPassword }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'userinfo',
          storage: localStorage //可以选择对应的存储形式（localStorage或者sessionStroage）
        }
      ]
    }
  }
)
export const useUserKeyStore = defineStore(
  'User-Key',
  () => {
    const userKeyInfo = ref({
      BaiduAppid: '202305xxxxx',
      BaiduAppKey: 'Azl9Wxxxxxx',
      YouDaoAppid: '',
      YouDaoAppKey: '',
      AiBaseUrl: 'http://xxx.com/v1',
      AiKey: 'sk-xxxxxx',
      AiModels: 'xxxx,xxx'
    })
    const setUserkey = (value) => {
      userKeyInfo.value = value
    }
    const setBaiduKey = (newAppid, newAppKey) => {
      userKeyInfo.value.BaiduAppid = newAppid
      userKeyInfo.value.BaiduAppKey = newAppKey
    }
    const setYoudaoKey = (newAppid, newAppKey) => {
      userKeyInfo.value.YouDaoAppid = newAppid
      userKeyInfo.value.YouDaoAppKey = newAppKey
    }
    const setAiKey = (newBaseUrl, newAiKey, newAiModels) => {
      userKeyInfo.value.AiBaseUrl = newBaseUrl
      userKeyInfo.value.AiKey = newAiKey
      userKeyInfo.value.AiModels = newAiModels
    }
    return { userKeyInfo, setUserkey, setBaiduKey, setYoudaoKey, setAiKey }
  },
  //启用持久化
  {
    persist: true
  }
)
export const useUserInfosStore = defineStore('userInfo', {
  // defineStore('userInfo',{})  userInfo就是这个仓库的名称name
  state: () => ({
    username: 'xiaoming',
    age: 23,
    like: 'girl'
  }),
  persist: true
})
