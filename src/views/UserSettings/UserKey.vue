<script setup>
import { ref } from 'vue'
import { useUserInfoStore, useUserKeyStore } from '@/stores'
import { Notification } from '@arco-design/web-vue'
const UserInfoStore = useUserInfoStore()
const UserKeyStore = useUserKeyStore()

const passForm = ref({
  password: '12345678',
  newpassword: '',
  renewpassword: ''
})
const Options = ref([
  {
    value: 'Baidu',
    label: '百度翻译',
    InputLabel: '直译'
  },
  {
    value: 'Youdao',
    label: '有道翻译'
  },
  {
    value: 'Ai',
    label: 'AI翻译'
  }
])
// 表单key
const keyForm = ref({
  appid: '',
  appKey: '',
  BaseUrl: '',
  AiKey: '',
  models: ''
})
const rulePassFormRef = ref()
// 修改密码校验规则
const passFormRules = {
  password: [
    { required: true, message: '请正确输入原密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,15}$/,
      message: '密码必须是8-15位字母和数字或特殊字符的组合',
      trigger: 'blur'
    }
  ],
  newpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,15}$/,
      message: '密码必须是8-15位字母和数字或特殊字符的组合',
      trigger: 'blur'
    }
  ],
  renewpassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,15}$/,
      message: '密码必须是8-15位字母和数字或特殊字符的组合',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== passForm.value.newpassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const translationSource = ref()
// 监听选择框变化，实时渲染
const handleTranslationSourceChange = () => {
  if (translationSource.value === 'Baidu') {
    keyForm.value.appid = UserKeyStore.userKeyInfo.BaiduAppid
    keyForm.value.appKey = UserKeyStore.userKeyInfo.BaiduAppKey
  } else if (translationSource.value === 'Youdao') {
    keyForm.value.appid = UserKeyStore.userKeyInfo.YouDaoAppid
    keyForm.value.appKey = UserKeyStore.userKeyInfo.YouDaoAppKey
  } else if (translationSource.value === 'Ai') {
    keyForm.value.BaseUrl = UserKeyStore.userKeyInfo.AiBaseUrl
    keyForm.value.AiKey = UserKeyStore.userKeyInfo.AiKey
    keyForm.value.models = UserKeyStore.userKeyInfo.AiModels
  }
}
// 保存key信息
const savekeySettings = () => {
  if (translationSource.value === 'Baidu') {
    if (!keyForm.value.appid || !keyForm.value.appKey) {
      Notification.warning({
        title: '提示',
        content: 'appid和appKey不能为空！'
      })
    }
    UserKeyStore.setBaiduKey(keyForm.value.appid, keyForm.value.appKey)
  }
  if (translationSource.value === 'Youdao') {
    if (!keyForm.value.appid || !keyForm.value.appKey) {
      Notification.warning({
        title: '提示',
        content: 'appid和appKey不能为空！'
      })
    }
    UserKeyStore.setYoudaoKey(keyForm.value.appid, keyForm.value.appKey)
  }
  if (translationSource.value === 'Ai') {
    if (
      !keyForm.value.BaseUrl ||
      !keyForm.value.AiKey ||
      !keyForm.value.models
    ) {
      Notification.warning({
        title: '提示',
        content: 'BaseUrl和Key和models都不能为空！'
      })
    }
    UserKeyStore.setAiKey(
      keyForm.value.BaseUrl,
      keyForm.value.AiKey,
      keyForm.value.models
    )
  }
  Notification.success({
    title: '提示',
    content: 'key保存成功!',
    position: 'topRight'
  })
}
// 保存修改密码
const saveNewPassword = async () => {
  if (passForm.value.password !== UserInfoStore.userInfo.password) {
    Notification.error({
      title: '错误',
      content: '密码错误!',
      position: 'topRight'
    })
    return
  }
  // console.log('密码', passForm.value)
  UserInfoStore.setNewPassword(passForm.value.newpassword)
  await Notification.success({
    title: '提示',
    content: '密码修改成功!',
    position: 'topRight'
  })
}
</script>
<template>
  <div class="right-container">
    <!-- 修改翻译源 -->
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <h3>修改翻译源</h3>
        </div>
      </template>
      <el-form
        :model="keyForm"
        label-width="120px"
        class="translation-settings-form"
      >
        <el-form-item label="翻译源">
          <el-select
            v-model="translationSource"
            placeholder="请选择翻译源"
            @change="handleTranslationSourceChange"
          >
            <el-option
              v-for="item in Options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 机器翻译 -->
        <div v-if="translationSource !== 'Ai'">
          <el-form-item label="Appid">
            <el-input v-model="keyForm.appid" autocomplete="off" />
          </el-form-item>
          <el-form-item label="App Key">
            <el-input v-model="keyForm.appKey" type="password" show-password />
          </el-form-item>
        </div>
        <!-- ai翻译 -->
        <div v-else>
          <el-form-item label="BaseUrl">
            <el-input
              v-model="keyForm.BaseUrl"
              placeholder="https://xxx.com/v1"
            />
          </el-form-item>
          <el-form-item label="Key">
            <el-input
              v-model="keyForm.AiKey"
              type="password"
              placeholder="sk-xxxxxxxxx"
              show-password
            />
          </el-form-item>
          <el-form-item label="models">
            <el-input
              v-model="keyForm.models"
              placeholder="多个模型名用英文逗号分隔"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="savekeySettings"
            >保存</el-button
          ></el-form-item
        >
      </el-form>
    </el-card>
    <!-- 修改密码组件 -->
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <h3>修改密码</h3>
        </div>
      </template>
      <el-form
        :model="passForm"
        label-width="120px"
        ref="rulePassFormRef"
        :rules="passFormRules"
        status-icon
      >
        <el-form-item label="原密码" prop="password">
          <el-input v-model="passForm.password" placeholder="输入原密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input
            v-model="passForm.newpassword"
            placeholder="输入新密码"
            show-password
            type="password"
          />
        </el-form-item>
        <el-form-item label="再次输入" prop="renewpassword">
          <el-input
            v-model="passForm.renewpassword"
            placeholder="请再次输入新密码"
            show-password
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveNewPassword"
            >修改密码</el-button
          ></el-form-item
        >
      </el-form></el-card
    >
  </div>
</template>
<style scoped>
.right-container {
  flex: 1;
}

.user-info-form,
.translation-settings-form {
  max-width: 400px;
}
.el-button {
  /* width: 5%; */
  padding: 20px;
}
</style>
