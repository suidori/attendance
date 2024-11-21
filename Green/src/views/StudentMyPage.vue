<template>
  <div id="main-container">
    <div id="main">
      <div id="title">
        <h1>마이페이지</h1>
        <hr />
      </div>
      <div id="main-top">
        <img src="@/assets/images/stude.jpg" alt="student" />
        <div id="main-top-text">
          <p>이름</p>
          <p>전화번호</p>
          <p>e-mail</p>
        </div>
        <div id="main-top-info">
          <p>김 철수</p>
          <p>010-XXXX-XXXX</p>
          <p>없음</p>
        </div>
        <button id="main-top-edit">개인 정보 수정</button>
      </div>
      <hr />
      <div id="main-bottom">
        <h1>수강중인 강좌</h1>
        <div id="lectures">
          <div id="lecturetitle">강좌1</div>
          <div id="lectureinfo">강의정보-강사:OOO / 강의 시간 0교시</div>
        </div>
        <div id="lectures">
          <div id="lecturetitle">강좌2</div>
          <div id="lectureinfo">강의정보-강사:OOO / 강의 시간 0교시</div>
        </div>
        <button id="lecturebutton">강좌 관리</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 부모 컨테이너 */
#main-container {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
}

/* 메인 섹션 관련 스타일 */
#main {
  width: 80%; /* 원하는 너비 설정 */
}

#title {
  margin-left: 7.5vh;
}

#title h1 {
  margin-bottom: 20px;
  color: #3c4983;
}

#title hr {
  border: 0;
  width: 950px;
  border-top: 2px solid #fbfbfb;
}

#main-top {
  display: flex;
  margin-top: 54px;
  margin-bottom: 34px;
}

#main-top img {
  height: 180px;
  margin-left: 140px;
}

#main-top-text {
  display: flex;
  flex-direction: column;
  color: #9e9e9e;
  margin: 10px 0 10px 43px;
}

#main-top-text p {
  margin: 17px;
  display: inline-block;
}

#main-top-info {
  display: flex;
  flex-direction: column;
  color: #dcdcdc;
  margin: 10px 0 10px 50px;
}

#main-top-info p {
  margin: 17px;
}

#main-top-edit {
  font-size: 18px;
  background-color: #3c4983;
  margin-left: 220px;
  color: #ffffff;
  height: 34px;
  margin-top: 73px;
  width: 165px;
  line-height: 50%;
}

#main > hr {
  width: 80%;
  margin-left: 29px;
  border: 0;
  border-top: 4px solid #3c4983;
}

#main-bottom {
  margin-left: 72px;
  margin-top: 55px;
}

#main-bottom h1 {
  margin-bottom: 30px;
  color: #3c4983;
}

#lectures {
  display: flex;
  margin: 21px 66px;
  align-items: center;
}

#lecturetitle {
  background-color: #3c4983;
  width: 170px;
  height: 57px;
  padding: 15px;
  color: #ffffff;
}

#lectureinfo {
  display: flex;
  align-items: center;
  margin-left: 16px;
  border: 1px solid #c4c4c4;
  width: 730px;
  height: 57px;
  color: #b7b7b7;
}

#lecturebutton {
  background-color: #3c4983;
  color: #ffffff;
  width: 165px;
  height: 34px;
  text-align: center;
  margin-left: 88.2vh;
  margin-top: 2vh;
  font-size: 18px;
  line-height: 50%;
}
</style>
