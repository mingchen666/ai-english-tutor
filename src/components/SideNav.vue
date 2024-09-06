<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// const isCollapse = ref(true)

const handleMenuClick = (route) => {
  router.push({ path: route })
}
</script>
<template>
  <div class="menu-demo">
    <a-menu show-collapse-button showCollapseButton :default-open-keys="['1']">
      <a-menu-item key="1" @click="handleMenuClick('/')">
        <template #icon><icon-home /> </template>
        首页
      </a-menu-item>
      <a-sub-menu key="2">
        <template #icon><icon-heart-fill /></template>
        <template #title>爱学英语</template>
        <a-menu-item key="2_0" @click="handleMenuClick('/english/translate')"
          >在线翻译</a-menu-item
        >
        <a-menu-item key="2_0" @click="handleMenuClick('/english/write')"
          >写作文</a-menu-item
        >
        <a-menu-item key="2_1" @click="handleMenuClick('/english/correct')"
          >改作文</a-menu-item
        >
        <a-menu-item key="2_2">其他</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="4" @click="handleMenuClick('/settings')">
        <template #icon><icon-settings /></template>
        设置
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style>
.menu-demo {
  width: 100%;
  height: 100vh;
  /* padding: 40px; */
  box-sizing: border-box;
  background-color: var(--color-neutral-2);
  overflow: hidden;
}

.menu-demo .arco-menu {
  /* width: 200px; */
  height: 100%;
  box-shadow: 0 0 1px rgba(169, 246, 245, 0.3);
}

.menu-demo .arco-menu :deep(.arco-menu-collapse-button) {
  width: 32px;
  height: 40px;
  border-radius: 50%;
}

.menu-demo
  .arco-menu:not(.arco-menu-collapsed)
  :deep(.arco-menu-collapse-button) {
  right: 0;
  bottom: 8px;
  transform: translateX(50%);
}

.menu-demo .arco-menu:not(.arco-menu-collapsed)::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48px;
  height: 48px;
  background-color: inherit;
  border-radius: 50%;
  box-shadow:
    -4px 0 2px var(--color-bg-2),
    0 0 1px rgba(0, 0, 0, 0.3);
  transform: translateX(50%);
}

.menu-demo .arco-menu.arco-menu-collapsed {
  width: 48px;
  height: auto;
  padding-top: 24px;
  padding-bottom: 138px;
  border-radius: 22px;
}

.menu-demo .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
  right: 8px;
  bottom: 8px;
}
.a-menu .a-menu-item {
  margin-bottom: 20px;
}
</style>
