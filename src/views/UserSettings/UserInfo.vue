<script setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores'
import { Notification } from '@arco-design/web-vue'
const UserInfoStore = useUserInfoStore()
const userInfo = UserInfoStore.userInfo

const saveUserInfo = async () => {
  try {
    await UserInfoStore.setUserInfo(userInfo)
    //弹出成功通知
    await Notification.success({
      title: '提示',
      content: '信息保存成功!',
      position: 'topLeft'
    })
  } catch (error) {
    //弹出错误通知
    await Notification.error({
      title: '错误',
      content: '信息保存失败!',
      position: 'topLeft'
    })
  }
}
const isShow = ref(true)
const closeAnnouncement = () => {
  isShow.value = false
}
</script>
<template>
  <div class="user-info">
    <el-avatar :size="100" :src="userInfo.avatar" />
    <el-form :model="userInfo" label-width="120px" class="user-info-form">
      <el-form-item label="用户ID">
        <el-input v-model="userInfo.userId" disabled />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickname" />
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input
          disabled
          model-value="···········"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="个人邮箱">
        <el-input v-model="userInfo.email" type="email" />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="userInfo.registrationTime" disabled />
      </el-form-item>
      <el-form-item label="用户类型">
        <el-input v-model="userInfo.userType" disabled />
      </el-form-item>
      <el-form-item class="button-container">
        <el-button type="primary" @click="saveUserInfo">提交修改</el-button>
      </el-form-item>
    </el-form>
    <div class="announcement-modal" v-if="isShow">
      <div class="announcement-content">
        <h2>《本站声明》</h2>
        <p>您的key信息全部存储在您本地,本站不会存储您的任何key信息.</p>
        <button @click="closeAnnouncement">我知道了</button>
      </div>
    </div>
  </div>
</template>

<style>
.user-info {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 20px;
  position: relative;
}

.user-info-form {
  width: 100%;
  max-width: 400px;
}

.el-form-item {
  text-align: left;
}

.button-container {
  /* float: inline-end; */
  float: right;

  display: flex;
  justify-content: flex-end;
}
.button-container .el-button {
  /* width: 100px; */
  /* padding: 20px; */
  text-align: center;
}
.announcement-modal {
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.announcement-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.announcement-content h2 {
  color: #333;
  margin-bottom: 10px;
}

.announcement-content p {
  color: #666;
  margin-bottom: 20px;
}

.announcement-content button {
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.announcement-content button:hover {
  background-color: #66b1ff;
}
</style>
