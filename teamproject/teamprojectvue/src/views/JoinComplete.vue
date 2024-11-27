<template>

    <div class="mt-10 flex justify-center">
        <div class="flex justify-center  w-full" style="width: 1300px;"  >
    <div class="border w-full p-20 m-3 rounded">
        <div class="text-center p-10">
            
       <div class="flex justify-center"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-28">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>
</div>
         
        <h1 class="text-3xl p-10">회원가입 완료</h1>
        <div class="bg-blue-200 p-10">
            <p>정상적으로 회원가입이 완료되었습니다.</p>
 
        </div>
        <div class="p-10">
            <!-- <button class="border border-1 p-3 mr-5 pr-10 pl-10 rounded" @click="gologinhome">메인으로</button> -->
            <button class="border border-1  p-3 mr-3 pr-7 pl-7 bg-blue-800 text-white rounded" @click="gologinview">로그인 페이지로</button>
        </div>
    </div>
    </div>
</div>
</div>

<div class="mb-64">

</div>
</template>

<script setup>
import Cookies from 'js-cookie';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// const gologinhome = () => {

// router.push({name:'loginhome'})
// }


const gologinview = () => {
    router.push({name:'loginview'})
}

onMounted(()=>{
    if(Cookies.get('token')==null){
    // if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
})
</script>

<style lang="scss" scoped>


</style>