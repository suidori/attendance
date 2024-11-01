<template>
  <div class="bg-blue-900 w-36">
    <aside class="p-4 text-white">
      <h2 class="h-20 mb-6 text-lg font-bold">메뉴</h2>
      <ul class="space-y-3">
        <hr />
        <RouterLink to="/attendancecheck">
          <li><a href="#" class="block pt-3 text-sm">출결 관리</a></li>
        </RouterLink>
        <hr />
        <li><a href="#" class="block text-sm">문의 게시판</a></li>
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
        <hr />
        <li><a href="#" class="block text-sm">공지 사항</a></li>
      </ul>
      <div class="mt-20 text-xs">
        <p>주소 : 대구광역시 교육 지원센터 OO</p>
        <p>전화 : 000-0000-000</p>
        <p>FAX : 000-0000-000</p>
      </div>
    </aside>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
