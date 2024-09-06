<script setup>
import SideNav from '../../components/SideNav.vue'
import Header from '../../components/HeaderCom.vue'
import MainCom from '../../components/MainCom.vue'
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
