<template>
  <div>
    <HeaderTop userType="학생용" />
    <div id="main-layout">
      <Sidebar />
      <div id="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTop from '@/components/HeaderTop.vue'
import Sidebar from '@/components/SideBar.vue'
import '@/assets/main.css'

export default {
  components: {
    HeaderTop,
    Sidebar,
  },
}
</script>

<style scoped>
#main-layout {
  display: flex; /* 사이드바와 컨텐츠를 수평으로 배치 */
}

#content {
  flex: 1; /* 나머지 공간을 차지하도록 설정 */
  padding: 20px; /* 필요에 따라 여백을 추가 */
}
</style>
