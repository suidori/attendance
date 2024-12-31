<template>
  <div class="w-[60vw] min-w-[620px]  mt-32">
   
    <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">강좌 관리</h1>
    <hr class="w-full mx-auto border-blue-900 mb-4 border-2">
  <div>
    <div>
      <!-- 인설트 모달창 -->
      <div v-if="modal"
        class="absolute z-50 h-auto bg-white border-2 -translate-x-2/4 -translate-y-2/4 left-1/2 rounded-2xl"
        style="width: 800px; top: 45%">
        <button class="float-right p-2 mr-3 text-2xl font-bold hover:bg-gray-300" @click.stop="modalClose">
          X
        </button>

        <br />
        <h1 class="mb-3 text-2xl font-bold text-center text-blue-800">새 강좌 생성</h1>
        <hr class="m-3 border-2 border-blue-800" />
        <div class="flex justify-center h-96">
          <div class="flex" style="align-items: center">
            <form action="" class="">
              <label for="" class="m-5">
                <div class="inline-block w-24 font-bold text-center" style="font-size: large">
                  강좌제목
                </div>
                <input v-model="posttitle"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text" />
              </label>
              <br />
              <br />
              <label for="" class="m-5">
                <div class="inline-block w-24 font-bold text-center" style="font-size: large">
                  강좌내용
                </div>
                <input v-model="postcontent"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text" />
              </label>
              <br />
              <br />
              <label for="" class="m-5">
                <div class="inline-block w-24 font-bold text-center" style="font-size: large">
                  강좌시작일
                </div>
                <input v-model="poststartDate"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="date" />
              </label>
              <br />
              <br />
              <label for="" class="m-5">
                <div class="inline-block w-24 font-bold text-center" style="font-size: large">
                  강좌종료일
                </div>
                <input v-model="postendDate"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="date" />
              </label>
              <br />
              <br />
              <label for="" class="m-5">
                <div class="inline-block w-24 font-bold text-center" style="font-size: large">
                  강의시간
                </div>
                <input v-model="poststartTime"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="time" />
                <div class="inline-block w-[3vw] ml-2 font-bold">부터</div>
                <input v-model="postendTime"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="time" />
                <div class="inline-block w-[3vw] ml-2 font-bold">까지</div>
              </label>
              <br />
              <br />
              <label for="" class="m-5">
                <div class="inline-block w-24 font-bold text-center" style="font-size: large">
                  비밀번호
                </div>
                <input v-model="postpassword"
                  class="px-3 py-1 pt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text" />
              </label>
            </form>
          </div>
        </div>
        <div class="flex justify-center">
          <button class="p-2 pl-8 pr-8 m-5 text-white bg-blue-800 border-2 border-blue-800 rounded-md"
            @click="insertlecture">
            등록
          </button>
          <button class="p-2 pl-8 pr-8 m-5 border-2 rounded-md" @click="modalClose">취소</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 강좌 리스트 -->

  <div class="flex flex-wrap w-full h-[40vw] overflow-auto mt-20">
    <div class="p-5 m-5 text-center border-2 rounded cursor-pointer" @click="insetlectur"
      style="width: 200px; height: 230px">
      <h1 class="z-10 mt-8 text-2xl font-bold text-gray-400">강좌개설</h1>

      <div class="flex justify-center mt-5">
        <div class="flex justify-center w-16 h-16 border-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9ca3af"
            class="size-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </div>
    <!-- key 수정 해야함 -->
    <div v-for="item in arr" :key="item.idx" class="p-5 m-5 overflow-auto border-2 rounded"
      style="width: 200px; height: 230px;">
      <h1 class="text-2xl font-bold">|현재 강좌</h1>
      <p>{{ item.title }}</p>
      <p class="text-sm">{{ item.content }}</p>
      <p class="text-xs">{{ item.startDate }} 부터</p>
      <p class="text-xs">{{ item.endDate }} 까지</p>
      <p class="text-xs">{{ item.startTime }} ~ {{ item.endTime }}</p>
      <p class="text-base">{{ item.enable ? '강의중' : '강좌 종료됨' }}</p>
      <button class="w-full text-white bg-blue-800 border" v-if="item.enable">강좌종료</button>
    </div>

    <!-- 페이지 넘버 리스트 -->
  </div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { insertlectureapi } from '@/api/lectureapi';
import { getavaillecturelistapi } from '@/api/lectureapi';
import { useRouter } from 'vue-router';

const router = useRouter()


//모달창 변수
const modal = ref(false);
const changemodal = ref(false);
const lecturestudentlist = ref(false);
const lecturestudentlistlord = ref(false);

//페이지 및 리스트
const pageNum = ref(0);
const arr = ref([]);
const totalpages = ref(10);

// post 맵핑용
const posttitle = ref('');
const postcontent = ref('');
const poststartDate = ref('');
const postendDate = ref('');
const poststartTime = ref('');
const postendTime = ref('');
const postpassword = ref('');

//인풋리셋 메서드
const resetdata = () => {
  posttitle.value = null;
  postcontent.value = null;
  poststartDate.value = null;
  postendDate.value = null;
  poststartTime.value = null;
  postendTime.value = null;
  postpassword.value = null;
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey);
  getavaillecture();
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey);
});

const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    modal.value = false;
    changemodal.value = false;

    resetdata();
  }
};


const insetlectur = () => {
  resetdata();

  modal.value = true;
  changemodal.value = false;
};

const modalClose = () => {
  modal.value = false;

  resetdata();
};

const changemodalClose = () => {
  changemodal.value = false;

  resetdata();
};

const endlecture = () => {
  console.log('강좌종료 메서드');
};

const insertlecture = async () => {

  const token = await localStorage.getItem('token'); //전역스코프 pinia 써서 토큰 저장한걸 불러오게 해야함

  if (token !== null) {

    const data = {
      title: posttitle.value,
      content: postcontent.value,
      startDate: poststartDate.value,
      endDate: postendDate.value,
      startTime: poststartTime.value,
      endTime: postendTime.value,
      password: postpassword.value
    };


    const res = await insertlectureapi(data)

    if (res.status == 200) {
      alert('강좌가 등록 되었습니다.');
      modal.value = false;
      getavaillecture();
    }
  } else {
    alert('시스템 에러발생');
  }
};


const getavaillecture = async () => {

  try {

    const res = await getavaillecturelistapi()

    // enable이 true인 데이터를 우선으로, 같은 enable 값끼리는 idx 내림차순으로 정렬
    arr.value = res.data.sort((a, b) => {

      if (a.enable !== b.enable) {

        return a.enable ? -1 : 1; // enable이 true인 항목이 우선
      }

      return b.idx - a.idx; // enable이 같은 경우 idx 내림차순
    });

  } catch (e) {
    console.log(e);
  }
}

onMounted(()=>{

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }

})
</script>

<style lang="scss" scoped></style>
