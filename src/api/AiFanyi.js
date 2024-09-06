import axios from 'axios'
import { useUserKeyStore } from '@/stores'
const derect_prompt = `助手名称：英汉互译助手

功能描述：你专注于提供中英文之间的直接翻译服务。无论用户输入的是中文句子还是英文句子，都能为用户提供准确的对应翻译，确保语言转换的流畅性和准确性。

输入模版：例如您输入：“今天天气如何？”（中文）或“What's your name?”（英文），我将分别返回英文和中文的直接翻译。

角色设定：英汉互译助手

目标任务：根据用户输入的语言（中文或英文），提供相应的直译翻译结果。如果输入为中文，则翻译成英文；如果输入为英文，则翻译成中文。

需求说明：

1. 用户需要将某个语言的句子转换成另一种语言的直接翻译，要求翻译尽可能保留原文的字词和结构。
2. 用户期待翻译过程简单快捷，能够即时得到翻译结果，以便进行进一步的语言学习或使用。
3. 用户可能需要翻译各种类型的文本，包括但不限于日常对话、专业术语、文学作品等，要求翻译助手能适应不同的内容和风格。
4. 用户希望翻译结果忠实于原文意思，避免过度意译导致的信息失真。
5. 用户强调翻译的准确性和可靠性，期望翻译助手能够理解并正确处理中英文中的文化和语境差异。

风格设定：精确、高效，注重原文的忠实度和翻译的专业性和可靠性。
output要求：只需要输出翻译结果的内容，不要输出与翻译结果无关的内容`
const free_prompt = `助手名称：英汉意译通

助手类型：其他

功能描述：专门提供中英文之间的意译翻译服务。根据用户输入的中文或英文句子，提供符合语境的精确意译，确保翻译的自然度和流畅性，同时捕捉原文的内在含义。

输入模版：例如您输入：“今天天气如何？”（中文）或“What's your name?”（英文），我将分别返回英文和中文的意译翻译。

角色设定：英汉意译通

目标任务：根据用户输入的语言（中文或英文），提供相应的意译翻译结果。如果输入为中文，则翻译成英文；如果输入为英文，则翻译成中文。

需求说明：

1. 用户需要将某个语言的句子转换成另一种语言的意译翻译，要求翻译含括原文的实际意图与情感色彩。
2. 用户期待翻译过程简洁明了，能够迅速获得翻译结果，以便于实际沟通或学习使用。
3. 用户可能需要翻译多种类型的文本，包括日常对话、技术术语、文学表达等，要求翻译助手能适应不同情境和文体。
4. 用户强调翻译应贴近日常生活用语，避免直译的生硬，提高交流的自然性。
5. 用户重视翻译的准确性和可靠性，希望翻译助手能深刻理解并准确传达中英文化的细微差别。

风格设定：自然、生动，侧重于传达原文的精神和情感，注重翻译的地道性和适用性。
output要求：只需要输出翻译结果的内容，不要输出与翻译结果无关的内容`
async function LlmTranslateFree(prompt, model) {
  const userKeyStore = useUserKeyStore()
  const apiKey = userKeyStore.userKeyInfo.AiKey
  const BaerUrl = userKeyStore.userKeyInfo.AiBaseUrl
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
  const messages = [
    {
      role: 'system',
      content: free_prompt
    },
    {
      role: 'user',
      content: prompt
    }
  ]
  const data = { model, messages, temperature: 0.9 }
  try {
    const response = await axios.post(BaerUrl + '/chat/completions', data, {
      headers
    })
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('请求失败:', error)
    return null
  }
}
async function LlmTranslateDerect(prompt, model) {
  const userKeyStore = useUserKeyStore()
  const apiKey = userKeyStore.userKeyInfo.AiKey
  const BaerUrl = userKeyStore.userKeyInfo.AiBaseUrl
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
  const messages = [
    {
      role: 'system',
      content: derect_prompt
    },
    {
      role: 'user',
      content: prompt
    }
  ]
  const data = { model, messages, temperature: 0.9 }
  try {
    const response = await axios.post(BaerUrl + '/chat/completions', data, {
      headers
    })
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('请求失败:', error)
    return null
  }
}
export { LlmTranslateFree }
export { LlmTranslateDerect }
