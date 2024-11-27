<template>
    <div class="ml-2 w-[1500px]">
    <div class="m-3 border border-gray-400  h-full w-full">
    <div class="">
      <div class="m-10">
        <div class="flex justify-between">
          <h1 class="m-3 inline-block" >
            <span class="font-bold"></span>
          </h1>
          <h1 class="m-3 inline-block" >
            -공지사항-
          </h1>
        </div>
        <div class="w-full ">
        <div class="border p-5 w-full  border-gray-400 inline-block">
        <hr class="m-1 mr-2 ml-2 border border-blue-500" />
        <div class="overflow-x-auto">
          <h1 class="font-bold m-2 ml-5 text-2xl ">{{title}} <span class="text-sm">({{lecture}})</span> <span class="text-sm mt-2 mr-5 float-end inline-block">{{user}} {{wdate}} </span> </h1>
        
          <hr class="m-1 mr-2 ml-2 border border-blue-500" />
          <div class="p-5">
          <div class=" mt-8 mb-10">
            {{body}}
          </div>
        </div>
    </div>  
    </div>
    </div>
    <div @click="godeskannouncelist"
             class="flex text-xl border-2  border-blue-300 pl-3 pr-3 my-8
             hover:bg-blue-300 hover:opacity-80
              hover:text-white cursor-pointer float-left rounded p-1"
          >
             공지사항 리스트 
          </div>
      </div>
      <div class="">
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAnnounceview } from '@/api/boradapi';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const route = useRoute()
const router = useRouter()

const title = ref('')
const body = ref('')
const wdate = ref('')
const user = ref('')
const lecture = ref('')


const godeskannouncelist = () => {

    router.go(-1)
}

onMounted( async()=>{

   const res =  await getAnnounceview(route.params.idx)

   title.value = res.data.title
   body.value = res.data.body
   wdate.value = res.data.wdate
   user.value = res.data.user
   lecture.value = res.data.lecture

if(Cookies.get('token')==null){
  //  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
})

</script>

<style lang="scss" scoped>

</style>