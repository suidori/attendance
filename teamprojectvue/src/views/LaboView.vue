<template>
    <!-- 드랍박스 여기 -->
  <div class="px-52">
    <DropBox />
    <label for="ex">라벨태그</label>
    <select name="ex" id="" class="p-1 border rounded-md">
        <option value="opt1">옵션1</option>
        <option value="opt2" class="">옵션2</option>
        <option value="op3">옵션3</option>
    </select>
  </div>

  <div>
    <!-- component -->
    <div class="flex items-center justify-center min-h-screen">
      <div class="max-w-[720px] mx-auto">
        <div class="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
          <a
            target="_blank"
            href="https://www.material-tailwind.com/docs/html/input-phone"
            class="block w-full px-4 py-2 text-center transition-all text-slate-700"
          >
            More components on <b>Material Tailwind</b>.
          </a>
        </div>



          <div class="relative mt-2">
            <div class="absolute left-0 flex items-center pl-3 top-2">
              <button
                id="dropdownButton"
                class="flex items-center justify-center h-full text-sm bg-transparent text-slate-700 focus:outline-none"
              >
                <span id="dropdownSpan">+33</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <div class="h-6 ml-2 border-l border-slate-200"></div>
              <div
                id="dropdownMenu"
                class="min-w-[150px] overflow-hidden absolute left-0 w-full mt-10 hidden bg-white border border-slate-200 rounded-md shadow-lg z-10"
              >
                <ul id="dropdownOptions">
                  <li
                    class="px-4 py-2 text-sm cursor-pointer text-slate-800 hover:bg-slate-100"
                    data-value="+33"
                  >
                    France (+33)
                  </li>
                  <li
                    class="px-4 py-2 text-sm cursor-pointer text-slate-800 hover:bg-slate-100"
                    data-value="+49"
                  >
                    Germany (+49)
                  </li>
                  <li
                    class="px-4 py-2 text-sm cursor-pointer text-slate-800 hover:bg-slate-100"
                    data-value="+34"
                  >
                    Spain (+34)
                  </li>
                  <li
                    class="px-4 py-2 text-sm cursor-pointer text-slate-800 hover:bg-slate-100"
                    data-value="+1"
                  >
                    USA (+1)
                  </li>
                </ul>
              </div>
            </div>
            <input
              type="number"
              class="w-full h-10 px-3 py-2 pl-20 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 focus:shadow-md"
              placeholder="324-456-2323"
            />
          </div>
        </div>

      </div>
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
  

</template>

<script setup>
import { ref } from 'vue';

// const arr = ref([])
// const pageNum = ref(0)
const totalpages = ref(10)



</script>

<style lang="scss" scoped>



</style>