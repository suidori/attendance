<template>
    <header>
      <div id="headercontainer">
        <span id="headeruser">{{ userType }}</span>
        <ul id="headermenu">
          <li><a href="#">로그인</a></li>
          <li><a href="#">회원가입</a></li>
          <li><a href="#">마이페이지</a></li>
          <li><a href="#">알림마당</a></li>
        </ul>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    props: {
      userType: {
        type: String,
        default: '학생용'
      }
    }
  };
  </script>
  
  <style scoped>
  #headercontainer {
    display: flex;
    width: 100vw;
    align-items: top;
  }
  #headeruser {
    border-left: 3.4px solid #3c4983;
    padding-left: 10px;
    color: #3c4983;
    margin: 52px;
    margin-left: 87px;
    font-size: 2vh;
  }
  #headermenu {
    display: flex;
    list-style: none;
    margin: 2.22vh 7.24vw 0 auto;
    padding: 0;
  }
  #headermenu li {
    margin-left: 1.04vw;
    font-size: 2.19vh;
  }
  #headermenu a {
  position: relative; /* 가상 요소 위치 조정을 위해 필요 */
  text-decoration: none;
  color: #3c4983;
  padding-left: 10px;
}

#headermenu a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 55%; /* 요소 높이의 절반 지점에서 시작 */
  transform: translateY(-50%); /* 수직 가운데 정렬 */
  height: 70%; /* 원하는 높이 설정 */
  width: 3.2px; /* 기존 border 두께 */
  background-color: #3c4983;
}

  </style>
  