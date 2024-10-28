<template>
    <div>
        <div class="flex justify-center  w-full"  >
    <div class="border w-full p-20 m-3 rounded">
        <div class="text-center p-10">
            
       <div>  <svg xmlns="http://www.w3.org/2000/svg" height="12" width="10.5" viewBox="0 0 448 512"></svg></div>
          <!-- 안됨 -->


        <h1 class="text-3xl p-10">회원가입 완료</h1>
        <div class="bg-blue-200 p-10">
            <p>정상적으로 회원가입이 완료되었습니다.</p>
            <p>로그인 후 이용하세요.</p>
        </div>
        <div class="p-10">
            <button class="border border-1 p-3 mr-5 pr-10 pl-10 rounded" @click="gologinhome">메인으로</button>
            <button class="border border-1  p-3 mr-5 pr-7 pl-7 bg-blue-800 text-white rounded" @click="gologinview">로그인하기</button>
        </div>
    </div>
    </div>
</div>
</div>

   
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const gologinhome = () => {

router.push({name:'loginhome'})
}


const gologinview = () => {

    router.push({name:'loginview'})
}


</script>

<style lang="scss" scoped>


</style>