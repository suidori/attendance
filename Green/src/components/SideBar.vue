<template>
    <div id="sidebar">
      <ul id="sidebarmenu">

        <li id="sidebarmenulist"><router-link to="/"><a href="#">출결 관리</a></router-link></li>
        <hr />
        <li id="sidebarmenulist"><a href="#">문의 게시판</a></li>
        <hr />
        <li id="sidebarmenulist"><a href="#">휴가 신청서 제출</a></li>
        <hr />
        <li id="sidebarmenulist"><a href="#">과정 선택</a></li>
        <hr />
        <li id="sidebarmenulist"><router-link to="/mypage">마이페이지</router-link></li>
        <hr />
        <li id="sidebarmenulist"><a href="#">공지 사항</a></li>
      </ul>
      <p class="footer">
        담당자 : 다람이<br />
        문의 : 000) 0000-0000<br />
        학원주소 : 학원시 학원구 학원동 학원로 OO<br />
        FAX : 000-0000
      </p>
    </div>
  </template>
  
  <style scoped>
  #sidebar {
    width: 271px;
    height: 750px;
    background-color: #3c4983;
    display: flex;
    flex-direction: column;
    margin-left: 87px;
  }
  #sidebarmenu {
    list-style: none;
    padding: 0;
    margin-top: 5vh;
  }
  #sidebarmenu li {
    position: relative;
    color: #ffffff;
    font-size: 2vh;
    padding: 21px 0;
    margin: 0 37px;
  }
  #sidebarmenu li a{
    color: #ffffff;
  }
  #sidebarmenulist {
    position: relative;
    font-size: 2vh;
    padding: 21px 0;
    margin: 0 37px;
  }
  #sidebarmenulist::after {
    content: "•";
    position: absolute;
    right: -0.5vw;
    font-size: 2vh;
    color: #ffffff;
  }
  #sidebarmenu hr {
    border: 0;
    border-top: 1px solid #ffffff;
    width: 80%;
    margin: 0 auto;
  }
  #sidebar p {
    margin-bottom: 0;
    margin-top: auto;
    color: #878a9a;
    font-size: 1.2vh;
    margin: auto auto 5px 19px;
  }
  </style>
  