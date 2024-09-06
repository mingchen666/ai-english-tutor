<script></script>
<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-logo">
        <!-- <img src="../assets/logo1.png" alt="" /> -->
      </div>
      <div class="header-right">
        <el-button type="primary" round>登录</el-button>
        <el-button type="success" round>注册</el-button>
      </div>
    </div>
  </div>
</template>
<style>
.header {
  /* display: flex; */
  height: 80px;
  /* background-color: #d51010; */
}
.header-left,
.header-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
