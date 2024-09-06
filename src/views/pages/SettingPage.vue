<script setup>
import SideNav from '../../components/SideNav.vue'
import Header from '../../components/HeaderCom.vue'
import UserInfo from '../UserSettings/UserInfo.vue'
import UserKey from '../UserSettings/UserKey.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><SideNav></SideNav></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main
          ><div class="settings-content">
            <UserInfo></UserInfo>
            <UserKey></UserKey></div
        ></el-main>
        <!-- <el-footer><Footer></Footer></el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<style>
.settings-content {
  /* flex: 1; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
}
.user-info,
.user-key {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.user-info {
  flex: 1;
  /* background-color: #f7f4f4; */
  margin-right: 20px;
}
.user-key {
  flex: 1;
  background-color: #b3f9c2;
  /* padding: 20px; */
  margin-top: 20px;
}
</style>
