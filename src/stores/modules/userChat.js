import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserChatStore = defineStore('user-Chat', () => {
  const system_write_prompt = `助手名称：英语作文达人

  功能描述：根据用户提供的具体作文要求，利用专业知识和语言能力，撰写符合要求的英语作文。无论用户需要的是叙事、议论还是说明性的英语作文，我都能提供高质量的写作服务。

  输入模版：您可以输入：“我需要一篇关于环保科技的文章，字数约500字。”

  角色设定：英语作文达人

  目标任务：依据用户的具体要求，创作出满足条件的英语作文。无论是文体、主题还是字数等要求，都应严格执行，确保作文的质量和相关性。

  需求说明：

      用户需要一篇符合特定要求的英语作文，可能涉及不同的主题、目的和风格。
      用户对作文的细节有具体的要求，如篇幅、格式、目标受众、写作风格等，这些需求必须在作文中得到体现。
      用户希望通过作文表达特定的信息或观点，作文内容需要清晰、逻辑性强，并能吸引读者的兴趣。
      用户期待作文中的语言准确无误，语法、拼写和标点都需要符合英语写作的标准。
      用户强调作文需要原创性，避免抄袭，确保内容的新颖和独特性。

  风格设定：专业、创造性，注重作文的结构完整性和语言表达的精确性，同时保证内容的原创性和吸引力。
  输出要求：只需要输出英语作文内容
  `

  // 返回消息值
  const message = ref('nss')
  // 写作文/作文分析加载状态
  const writeLoading = ref(false)
  // 作文估分加载状态
  const scoreLoading = ref(false)
  // 需要分析的作文内容
  const writeContent = ref('')
  const setWriteContent = (val) => {
    writeContent.value = val
  }
  const setWriteLoading = (value) => {
    writeLoading.value = value
  }
  const setScoreLoading = (value) => {
    scoreLoading.value = value
  }
  // 设置返回消息值
  const setMessage = (value) => {
    message.value = value
  }
  // write消息列表
  const write_messages = ref([
    {
      role: 'system',
      content: system_write_prompt
    }
  ])
  // 添加write消息
  function addWriteMessage(role, content) {
    write_messages.value.push({ role: role, content: content })
  }
  // correct系统提示词
  const system_correct_prompt = `角色设定：英语作文老师
目标任务：对用户提供的英语作文进行评分，并给出专业的修改建议以提升作文质量。
需求说明：

    作文内容评审：仔细阅读并理解作文内容，评价其主题表达是否清晰、论点是否合理、信息是否充分。

    语言和语法检查：检查作文中的语法、拼写和标点错误，确保语言表达的准确性和专业性。

    风格和结构分析：分析作文的结构是否合适、过渡是否自然、结论是否明确。评价作文的风格是否恰当，是否符合写作目的和目标读者。

    建议和反馈：提供具体、建设性的反馈，包括改进作文结构、内容、语言和风格的建议。指出作文的优点和可以改进的地方。


风格设定：严谨、专业，注重细节，致力于帮助学生提高英语写作能力。

输出格式：markdown格式
语言：中文
作文分析输出字数限制：300字以内
`
  // correct消息列表
  const correct_messages = ref([
    {
      role: 'system',
      content: system_correct_prompt
    }
  ])
  // 添加write消息
  function addCorerectMessage(role, content) {
    correct_messages.value.push({ role: role, content: content })
  }
  // 切换模型，清空重置消息列表
  function resetMessages() {
    correct_messages.value = [
      {
        role: 'system',
        content: system_correct_prompt
      }
    ]
  }
  return {
    message,
    write_messages,
    correct_messages,
    setMessage,
    addWriteMessage,
    setWriteLoading,
    addCorerectMessage,
    writeLoading,
    writeContent,
    setWriteContent,
    resetMessages,
    scoreLoading,
    setScoreLoading
  }
})
