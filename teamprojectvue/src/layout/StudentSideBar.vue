<template>

  <div class="bg-blue-900 w-36 ">
    <aside class="p-4 text-white">
      <h2 class="h-20 mb-6 text-lg font-bold">학생 메뉴</h2>
      <ul class="space-y-3">
        <hr />
        <RouterLink to="/stdatt">
          <li><a href="#" class="block pt-3 text-sm">출결 관리</a></li>
        </RouterLink>
        <hr />
        <RouterLink to="/vacationform">
          <li><a href="#" class="block pt-3 text-sm">휴가 신청서 제출</a></li>
        </RouterLink>
        <hr />
        <RouterLink to="/lectureselect">
          <li><a href="#" class="block pt-3 text-sm">과정 선택</a></li>
        </RouterLink>
        <hr />
        <RouterLink to="/mypage">
          <li><a href="#" class="block pt-3 text-sm">마이페이지</a></li>
        </RouterLink>
        <!-- <hr />
        <li><a href="#" class="block text-sm">공지 사항</a></li> -->
      </ul>
      <div class="mt-20 text-xs">
        <p>주소 : 대구광역시 중구 중앙대로 394, <br> 제일빌딩 5F</p>
        <p>전화 : 053-572-1005</p>
        <p>FAX : 053-422-9122</p>
      </div>
    </aside>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
