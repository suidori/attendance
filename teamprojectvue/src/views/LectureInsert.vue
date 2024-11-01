<template>
  <div>
    <div>

        <!-- 인설트 모달창 -->
      <div
        v-if="modal"
        class="h-auto -translate-x-2/4 absolute -translate-y-2/4 left-1/2 border-2 rounded-2xl bg-white z-50"
        style="width: 800px; top: 55%"
      >
        <button class="float-right mr-3 text-2xl p-2 font-bold hover:bg-gray-300" @click.stop="modalClose">X</button>

        <br />
        <h1 class="text-center text-blue-800 text-2xl font-bold mb-3">새 강좌 생성</h1>
        <hr class="border-2 border-blue-800 m-3" />
        <div class="justify-center flex h-96">
          <div class="flex" style="align-items: center">
            <form action="" class=" ">
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강좌제목
                </div>
                <input
                  v-model="posttitle"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강좌내용
                </div>
                <input
                  v-model="postcontent"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강좌시작일
                </div>
                <input
                  v-model="poststartDate"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강좌종료일
                </div>
                <input
                  v-model="postendDate"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강의시간
                </div>
                <input
                  v-model="poststartTime"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                />
                <div class="w-24 font-bold ml-2 inline-block">부터</div>
                <input
                  v-model="postendTime"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                />
                <div class="w-24 font-bold ml-2 inline-block">까지</div></label
              >
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  비밀번호
                </div>
                <input
                  v-model="postpassword"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
            </form>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="border-2 border-blue-800 m-5 p-2 pl-8 pr-8 rounded-md bg-blue-800 text-white"
            @click="insertlecture"
          >
            등록
          </button>
          <button class="border-2 m-5 p-2 pl-8 pr-8 rounded-md" @click="modalClose">취소</button>
        </div>
      </div>
    </div>



       <!-- 시간 수정 모달창 -->
    <div>
      <div
        v-if="changemodal"
        class="h-auto -translate-x-2/4 absolute -translate-y-2/4 left-1/2 border-2 rounded-2xl bg-white z-50"
        style="width: 800px; top: 55%"
      >
        <button class="float-right mr-3 text-2xl p-2 font-bold hover:bg-gray-300" @click.stop="changemodalClose">X</button>

        <br />
        <h1 class="text-center text-blue-800 text-2xl font-bold mb-3">시간변경</h1>
        <hr class="border-2 border-blue-800 m-3" />
        <div class="justify-center flex h-96">
          <div class="flex" style="align-items: center">
            <form action="" class=" ">
              <div class="flex justify-center mb-20 text-2xl">
                <h1>-get강좌제목-</h1>
              </div>

              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강좌시작일
                </div>
                <input
                  v-model="poststartDate"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강좌종료일
                </div>
                <input
                  v-model="postendDate"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  강의시간
                </div>
                <input
                  v-model="poststartTime"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                />
                <div class="w-24 font-bold ml-2 inline-block">부터</div>
                <input
                  v-model="postendTime"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                />
                <div class="w-24 font-bold ml-2 inline-block">까지</div></label
              >
              <br />
              <br />
              <label for="" class="m-5"
                ><div class="w-24 font-bold text-center inline-block" style="font-size: large">
                  비밀번호
                </div>
                <input
                  v-model="postpassword"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
              /></label>
            </form>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="border-2 border-blue-800 m-5 p-2 pl-8 pr-8 rounded-md bg-blue-800 text-white"
            @click="chengelecturetime"
          >
            수정
          </button>
          <button class="border-2 m-5 p-2 pl-8 pr-8 rounded-md" @click="changemodalClose">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>


  <!-- 배경 파란줄 -->

  <div class="mb-4">
    <h1 class="text-2xl font-bold mb-2">과정 선택</h1>

    <hr class="border-t-2 border-blue-600" />
  </div>

  <!-- 강좌 리스트 -->

  <div class="flex justify-center">
    <div class="flex overflow-auto flex-wrap" style="width: 1500px">
      <div
        class="border-2 rounded p-5 m-5 text-center cursor-pointer"
        @click="insetlectur"
        style="width: 200px; height: 230px"
      >
        <h1 class="text-2xl font-bold mt-8 z-10 text-gray-400">광좌개설</h1>

        <div class="flex justify-center mt-5">
          <div class="w-16 h-16 flex justify-center border-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#9ca3af"
              class="size-16"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>
      </div>

      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>

      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      
      <div class="border-2 rounded p-5 m-5 cursor-pointer" style="width: 200px; height: 230px"  @click="lecturestudentlistopen">
        <h1 class="text-2xl font-bold">|현재 강좌</h1>
        <br />
        <p>강좌제목</p>
        <p>0교시</p>
        <p>00:00 ~ 00:00</p>
        <button class="border bg-blue-800 text-white w-full " @click.stop="opnechengelecture">
          시간변경
        </button>
        <br />
        <button class="border bg-blue-800 text-white w-full" @click.stop="endlecture">강좌종료</button>
      </div>
      <!-- key 수정 해야함 -->
      <!-- <div v-for="item in arr" :key="" class="border-2 rounded p-5 m-5" style="width: 200px; height: 230px;"  @click="lecturestudentlistopen">
            <h1 class="text-2xl font-bold">|현재 강좌</h1>
            <br>
            <p>강좌제목</p>
            <p>0교시</p>
            <p>00:00 ~ 00:00</p>
            <button class="border bg-blue-800 text-white w-full " >시간변경</button>
            <br>
            <button class="border bg-blue-800 text-white w-full" >강좌종료</button>
        </div> -->
    </div>
  </div>

  <!-- 페이지 넘버 리스트 -->

  <div>
    <div class="flex justify-center">
      <ul class="flex space-x-2">
        <li
          class="cursor-pointer p-3"
          v-for="num in totalpages"
          v-bind:key="num"
          @click="setpageNum(num - 1)"
        >
          {{ num }}
        </li>
      </ul>
    </div>
  </div>



  <!-- 강의듣는 학생 리스트 -->

  <div v-if="lecturestudentlist" class="mt-10">
  <div class="w-full   flex justify-center ">
    
    <ul class="w-full flex justify-center py-2 border-2">
        <li class="inline-block text-center w-1/6 border-r-2">강좌(1)</li>
        <li class="inline-block w-4/6 ml-2">학생정보 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="size-6 inline-block cursor-pointer" @click="lecturestudentlistlordopen" >
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>
</li>

        <li class="inline-block w-1/6 float-right mr-5">현재학생 수 00명</li>
    </ul>





  </div>
</div>

<!-- 강의듣는 학생 리스트 상세 -->
<div class="" v-if="lecturestudentlistlord">
    <ul class="w-full flex justify-center ">
<li class="w-2/6 text-center border-2 py-2">이름</li>
<li class="w-4/6 text-center border-2 py-2">금일출결현황</li>
    </ul>
</div>
</template>




<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import axios from 'axios'


//모달창 변수
const modal = ref(false)
const changemodal = ref(false)
const lecturestudentlist = ref(false)
const lecturestudentlistlord = ref(false)


//페이지 및 리스트
const totalpages = ref(10)

// post 맵핑용
const posttitle = ref('')
const postcontent = ref('')
const poststartDate = ref('')
const postendDate = ref('')
const poststartTime = ref('')
const postendTime = ref('')
const postpassword = ref('')

// get맵핑용

//인풋리셋 메서드
const resetdata =() => {
    posttitle.value = null
    postcontent.value = null
    poststartDate.value = null
    postendDate.value = null
    poststartTime.value = null
    postendTime.value = null
    postpassword.value = null
}

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
})

const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    modal.value = false
    changemodal.value = false
    
  resetdata()

  }
}


const lecturestudentlistopen =()=>{

   resetdata()

    if( lecturestudentlist.value == true){
        lecturestudentlist.value = false
        lecturestudentlistlord.value = false

        return
    }
    lecturestudentlist.value = true
}


const lecturestudentlistlordopen =() => {

    resetdata()

    if(lecturestudentlistlord.value == true){
        lecturestudentlistlord.value = false
        return
    }

    lecturestudentlistlord.value = true

}


const insetlectur = () => {

    resetdata()

  modal.value = true
  changemodal.value = false
}

const modalClose = () => {
  modal.value = false

  resetdata()
}

const changemodalClose = () => {
  changemodal.value = false

  resetdata()
}

const endlecture = () => {
  console.log('강좌종료 메서드')
}



const opnechengelecture = () => {

    resetdata()

  modal.value = false
  changemodal.value = true
  
}



const insertlecture = async () => {


const token = await localStorage.getItem('token') //전역스코프 pinia 써서 토큰 저장한걸 불러오게 해야함

if (token !== null) {
  const head = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const data = {
    title: posttitle.value,
    content: postcontent.value,
    startDate: poststartDate.value,
    endDate: postendDate.value,
    startTime: poststartTime.value,
    endTime: postendTime.value,
    password: postpassword.value
  }

  const res = await axios.post(`http://192.168.0.5:8080/lecture/save`, data, head)

  if (res.status == 200) {
    alert('강좌가 등록 되었습니다.')
    modal.value = false
  }
} else {
  alert('시스템 에러발생')
}
}


const chengelecturetime = async () => {

  // const data = {
  //   startDate: poststartDate.value,
  //   endDate: postendDate.value,
  //   startTime: poststartTime.value,
  //   endTime: postendTime.value,
  //   password: postpassword.value
  // }

  // const token = await localStorage.getItem('token')

  // const head = {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }

  // const res = await axios.post(`http://192.168.0.5:8080/lecture/save`, data, head)

  alert('시간변경이 완료되었습니다.')
  changemodal.value = true
}
</script>

<style lang="scss" scoped></style>
