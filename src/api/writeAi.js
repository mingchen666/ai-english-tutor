import axios from 'axios'
import { useUserKeyStore, useUserChatStore } from '@/stores'

async function writeGenerate(prompt, model) {
  const userChatStore = useUserChatStore()
  const userKeyStore = useUserKeyStore()
  const apiKey = userKeyStore.userKeyInfo.AiKey
  const BaerUrl = userKeyStore.userKeyInfo.AiBaseUrl
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
  const prompt_mesage = `现在，英语作文要求如下:${prompt}，请根据要求完成这篇作文`
  //添加用户消息到 messages
  userChatStore.addWriteMessage('user', prompt_mesage)
  const data = {
    model: model,
    messages: userChatStore.write_messages,
    temperature: 0.9
    // stream: true
  }
  try {
    const response = await axios.post(BaerUrl + '/chat/completions', data, {
      headers
    })
    // 将回复消息添加到 messages
    // userChatStore.addMessage(
    //   'assistant',
    //   response.data.choices[0].message.content
    // )
    // userChatStore.message = response.data.choices[0].message.content

    console.log(response.data.choices[0].message.content)

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('请求失败:', error)
    return null
  }
}

export { writeGenerate }
