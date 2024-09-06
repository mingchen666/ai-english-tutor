<script setup>
// import { Action } from 'element-plus'
// import { onMounted } from 'vue'
import SideNav from '../../components/SideNav.vue'
import Header from '../../components/HeaderCom.vue'
import MainCom from '../../components/MainCom.vue'

// onMounted(() => {
//   open()
// })
// open()
// import Footer from '../components/FooterCom.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><SideNav></SideNav></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><MainCom></MainCom></el-main>
        <!-- <el-footer><Footer></Footer></el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
