<template>
  <div class="flex items-center justify-center">
<VacationManage></VacationManage>
  </div>
</template>

<script setup>
import VacationManage from '@/views/Desk/VacationManage.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()


onMounted(()=>{

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }

})
</script>

<style lang="scss" scoped>

</style>