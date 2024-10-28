<template>
  <div class="flex flex-col items-center p-10 space-y-6 -mt-20">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-blue-900">회원가입</h2>

    <!-- Step Progress Bar -->
    <div class="flex justify-center space-x-2 w-full max-w-2xl">
      <div class="step flex flex-col items-center p-4 text-center bg-blue-900 text-white rounded-tl-lg rounded-bl-lg w-1/4">
        <p class="text-xl font-bold">01.</p>
        <p class="text-sm">이용약관 및<br>개인정보 수집 및 이용에 관한 동의</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-white text-gray-700 border border-gray-300 w-1/4">
        <p class="text-xl font-bold">02.</p>
        <p class="text-sm">본인인증 및<br>기본정보 입력</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-blue-800 text-white w-1/4">
        <p class="text-xl font-bold">03.</p>
        <p class="text-sm">아이디 및<br>패스워드 설정</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-gray-100 text-gray-500 rounded-tr-lg rounded-br-lg w-1/4">
        <p class="text-xl font-bold">04.</p>
        <p class="text-sm">회원가입 완료</p>
      </div>
    </div>

    <!-- Agreement Checkbox -->
    <div class="w-full max-w-2xl">
      <div class="flex items-center space-x-2">
        <input type="checkbox" id="all-agree" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
        <label for="all-agree" class="text-gray-700">모두 동의합니다.</label>
      </div>

      <!-- Terms Sections -->
      <div class="mt-4 space-y-4">
        <div class="p-4 border border-gray-300 rounded bg-gray-50 h-32 overflow-auto text-sm">
          <p>제1조 (개인정보 보호 및 이용 기간)<br>
          수집한 개인정보는 수집•이용 동의일로부터 개인정보 수집•이용 목적을 달성할 때 까지 보관 및 이용합니다. 개인정보 보유기간 1년의 경과, 처리목적의 달성 등 개인 정보가 불필요하게 되었을 때에는 해당 개인정보를 파기합니다.<br><br></p>
          <p>제2조 (동의 거부 권리)<br>
          귀하는 본 안내에 따른 개인정보 수집•이용에 대하여 동의를 거부할 권리가 있습니다. 다만, 귀하가 개인정보 동의를 거부하시는 경우에 서비 중 일정사용의 불이익이 발생할 수 있음을 알려드립니다.<br><br></p>
          <p>제3조 (개인정보의 제3자 제공)<br>
          회사는 개인정보보호법에 의거하여 다음과 같은 내용으로 개인정보를 제3자에게 제공할 수 있습니다.
          정보주체의 동의를 받지 않고 개인정보를 제3자에게 제공한 자 및 그 사정을 알고 개인정보를 제공받은 자는 5년 이하의 징역 또는 5천만원 이하의 벌금에 처해집니다</p>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="agree1" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
          <label for="agree1" class="text-gray-700">개인정보 수집 및 이용약관에 동의합니다.</label>
        </div>

        <div class="p-4 border border-gray-300 rounded bg-gray-50 h-32 overflow-auto">
          <p>제1조 (목적) <br>
            학원(이하 '회사'라고 함)는 회사가 제공하고자 하는 서비스(이하 '회사 서비스')를 이용하는 개인(이하 '이용자'또는 '개인')의 정보(이하'개인정보')를 보호하기 위해, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법류 (이하 '정보통신망법')등 관련 법령을 준사하고, 서비스 이용자의 개인정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 위하여 다음과 같이 개인정보 처리방침(이하 '본 방침')을 수립합니다. <br><br>
          </p>
          <p>제2조 (개인정보 처리 목적)<br>
          개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제 3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.<br><br></p>
          <p>제3조(본 방침의 공개)<br>
          1. 정보주체로부터 별도의 동의를 받은 경우<br>
2. 법률에 특별한 규정이 있는 경우<br>
3. 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우<br>
4. 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면 다른 법률에서 정하는 소관업무를 수행할 수 없는 경우로서 보호위원회의 심의ㆍ의결을 거친 경우<br>
5. 조약, 그 밖의 국제협정의 이행을 위하여 외국정부 또는 국제기구에 제공하기 위하여 필요한 경우<br>
6. 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우<br>
7. 법원의 재판업무 수행을 위하여 필요한 경우<br>
8. 형 및 감호, 보호처분의 집행을 위하여 필요한 경우<br>
9. 공중위생 등 공공의 안전과 안녕을 위하여 긴급히 필요한 경우<br><br>
        </p>
        <p> 제4조(개인정보처리의 위탁)<br>
①법원은 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
②법원은 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무의 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
③위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.<br><br></p>
        </div>

        <div class="flex items-center space-x-2">
          <input type="checkbox" id="agree2" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
          <label for="agree2" class="text-gray-700">개인정보 수집 및 이용약관에 동의합니다.</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>