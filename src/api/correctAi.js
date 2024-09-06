import axios from 'axios'
import { useUserKeyStore, useUserChatStore } from '@/stores'

async function correctGenerate(writeContent, require, model) {
  const userChatStore = useUserChatStore()
  const userKeyStore = useUserKeyStore()
  const apiKey = userKeyStore.userKeyInfo.AiKey
  const BaerUrl = userKeyStore.userKeyInfo.AiBaseUrl
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
  const prompt_mesage = `现在，用户写的作文内容是:${writeContent},作文额外要求:${require}，请分析一下这篇作文,不超过300字，并且只输出分析内容`
  //添加用户消息到 messages
  userChatStore.addCorerectMessage('user', prompt_mesage)
  const data = {
    model: model,
    messages: userChatStore.correct_messages,
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
// 估分
async function scoreGenerate(writeContent, require, score, model) {
  const userChatStore = useUserChatStore()
  const userKeyStore = useUserKeyStore()
  const apiKey = userKeyStore.userKeyInfo.AiKey
  const BaerUrl = userKeyStore.userKeyInfo.AiBaseUrl
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
  const prompt_mesage = `我的作文内容是:${writeContent},作文额外要求:${require}，英语作文总分:${score}分,请你根据作文的整体质量要求，给出一个合理的评分，输出格式：无需输出分析内容，只需输出作文分数`
  //添加用户消息到 messages
  userChatStore.addCorerectMessage('user', prompt_mesage)
  const data = {
    model: model,
    messages: userChatStore.correct_messages,
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

export { correctGenerate, scoreGenerate }
