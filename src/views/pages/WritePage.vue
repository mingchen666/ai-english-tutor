<script setup>
// import { ref } from 'vue'
import SideNav from '../../components/SideNav.vue'
import Header from '../../components/HeaderCom.vue'
import LeftCom from '../writepage/LeftCom.vue'
import RightCom from '../writepage/RightCom.vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><SideNav></SideNav></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main
          ><el-row :gutter="20" class="container">
            <!--左边占三分之二 -->
            <el-col :span="14" class="left-container">
              <div class="content">
                <!--左边内容 -->
                <LeftCom></LeftCom>
              </div>
            </el-col>
            <!--右边占三分之一 -->
            <el-col :span="10" class="right-container">
              <div class="content">
                <!--右边内容 -->
                <RightCom />
              </div>
            </el-col> </el-row
        ></el-main>
        <!-- <el-footer><Footer></Footer></el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.left-container,
.right-container {
  max-height: 600px;
}

.content {
  padding: 5px;
  /* background-color: #f0f2f5; */
  border-radius: 4px;
  height: 100%;
}
</style>
