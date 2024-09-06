<template>
  <div class="not-found-container">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="24">
        <el-card class="not-found-card">
          <div class="not-found-content">
            <h1 class="not-found-title">404</h1>
            <p class="not-found-subtitle">页面未找到</p>
            <el-button type="primary" @click="goHome">返回首页</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.not-found-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found-card {
  text-align: center;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px; /* 限制卡片的最大宽度 */
}

.not-found-title {
  font-size: 80px;
  color: #333;
  margin: 0 0 20px 0;
}

.not-found-subtitle {
  font-size: 24px;
  color: #666;
  margin: 10px 0 30px 0;
}
</style>
