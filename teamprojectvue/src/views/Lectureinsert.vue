<template>
    <div>
 
    <div  >
        <div v-if="modal"  class="h-auto -translate-x-2/4 absolute -translate-y-2/4 top-1/2 left-1/2 border-2 rounded-2xl bg-white z-50 " style="width: 800px; ">
        <button class=" float-right mr-3 mt-1 text-2xl" @click.stop="modalClose" >X</button>

        <br>
        <h1 class="text-center text-blue-800 text-2xl font-bold mb-3">새 강좌 생성</h1>
        <hr class="border-2 border-blue-800 m-3">
        <div class=" justify-center flex h-96  ">

            <div class="flex" style="align-items: center;">

        <form action="" class=" "   > 
            
            <label 
             for="" class="m-5" ><div class="w-24 font-bold  text-center inline-block" style="font-size: large;">강좌제목</div><input v-model="title"
                class=" px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text"></label>
            <br>
            <br>
        <label 
         for="" class=" m-5  "><div class="w-24 font-bold text-center inline-block  " style="font-size: large;">강좌내용</div><input v-model="content"
            class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text"></label>
        <br>
        <br>
        <label 
         for="" class=" m-5 "><div class="w-24 font-bold text-center inline-block " style="font-size: large;">강좌시작일</div><input v-model="startDate"
            class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text"></label>
        <br>
        <br>
        <label 
         for="" class=" m-5 "><div class="w-24 font-bold text-center inline-block " style="font-size: large;">강좌종료일</div><input v-model="endDate"
            class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text"></label>
        <br>
        <br>
        <label 
         for="" class=" m-5 "><div class="w-24 font-bold text-center inline-block " style="font-size: large;">강의시간</div><input v-model="startTime"
            class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text"><div class="w-24 font-bold ml-2 inline-block">부터</div>
            <input v-model="endTime"
             class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text"><div class="w-24 font-bold ml-2 inline-block">까지</div></label>
        <br>
        <br>
        <label
         for="" class=" m-5 "><div class="w-24 font-bold text-center inline-block " style="font-size: large;">비밀번호</div><input v-model="password"
            class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text"></label>
    </form>

    
</div>

  </div>
  <div class="flex justify-center ">
    <button class="border-2 border-blue-800 m-5 p-2 pl-8 pr-8 rounded-md bg-blue-800 text-white" @click="insertlecture">등록</button> 
    <button class="border-2 m-5 p-2 pl-8 pr-8 rounded-md" @click="modalClose">취소</button>
</div>
  
</div>
    </div>

        <div class="mb-4" >
        <h1 class="text-2xl font-bold mb-2">과정 선택</h1>
        
        <hr class="border-t-2 border-blue-600" />
      </div>
 
      <!-- 강좌 리스트 -->
      <div class="w-full flex ">

        <div class="border-2 rounded p-5 m-5" style="width: 200px; height: 230px;">
            <h1 class="text-2xl font-bold">|현재 강좌</h1>
            <br>
            <p>강좌제목</p>
            <p>0교시</p>
            <p>00:00 ~ 00:00</p>
            <button class="border bg-blue-800 text-white w-full " >시간변경</button>
            <br>
            <button class="border bg-blue-800 text-white w-full" >강좌종료</button>
        </div>

        <div class="border-2 rounded p-5 m-5 text-center" @click="insetlectur" style="width: 200px; height: 230px;">
            <h1 class="text-2xl font-bold mt-8 z-10 text-gray-400" >광좌개설</h1>
        </div>
      </div>

</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';

const modal = ref(false)

const title = ref('')
const content = ref('')
const startDate = ref('')
const endDate = ref('')
const startTime = ref('')
const endTime = ref('')
const password = ref('')


onMounted(()=>{
document.addEventListener('keydown', handleEscKey);

})

onUnmounted(()=>{
document.removeEventListener('keydown', handleEscKey)

})


const handleEscKey = (event)=> {
if(event.key === 'Escape'){
    modal.value = false
}

}

const insetlectur = () => {

    modal.value = true
}

const modalClose = () => {

    modal.value = false
}


const insertlecture = async() => {

    const token = await localStorage.getItem('token') //전역스코프 pinia 써서 토큰 저장한걸 불러오게 해야함

    if(token !==null){

    const head = {headers: {
                 'Authorization':`Bearer ${token}`
                 }}

    const data = {
        title : title.value,
        content : content.value,
        startDate : startDate.value,
        endDate : endDate.value,
        startTime : startTime.value,
        endTime : endTime.value,
        password : password.value
    }

    const res = await axios.post(`http://192.168.67:8080/lecture/save`,data ,head)

    if(res.status==200){
        alert('강좌가 등록 되었습니다.')
        modal.value = false

        }

    }else{
        alert("시스템 에러발생")
    }

     
}






</script>

<style lang="scss" scoped>

</style>