<template>
  <div id="main-container">
    <div id="main">
      <div id="title">
        <h1>출결 관리</h1>
      </div>
      <div id="calendar">
        <div class="calendar-header">
          <button @click="prevMonth" class="nav-button">&lt;</button>
          <span class="month-display">{{ currentYear }}.{{ currentMonth.toString().padStart(2, '0') }}</span>
          <button @click="nextMonth" class="nav-button">&gt;</button>
        </div>
        <div class="calendar-days">
          <div v-for="day in days" :key="day" class="calendar-day-header">{{ day }}</div>
          <div
            v-for="(date, index) in calendarDates"
            :key="index"
            :class="['calendar-date', { 'empty-date': date === '' }]"
          >
            <span v-if="date">{{ date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      days: ['일', '월', '화', '수', '목', '금', '토'],
      calendarDates: []
    };
  },
  mounted() {
    this.generateCalendar();
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.generateCalendar();
    },
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.generateCalendar();
    },
    generateCalendar() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
      const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
      this.calendarDates = Array(firstDay).fill('').concat([...Array(daysInMonth).keys()].map(i => i + 1));
    }
  }
};
</script>

<style scoped>
#main-container {
  display: flex;
  justify-content: center; 
}

/* 메인 섹션 관련 스타일 */
#main {
  width: 80%;
}

#title {
  margin-left: 6vh;
}

#title h1 {
  margin-bottom: 20px;
  color: #3c4983;
}

#calendar {
  border: 1px solid #3c4983;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: #3c4983;
  color: white;
  padding: 10px;
}

.nav-button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  margin: 0 50px; 
}

.nav-button:hover {
  transform: scale(1.2);
}

.month-display {
  font-size: 1.2rem;
  font-weight: bold;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  background-color: #f5f5f5;
}

.calendar-day-header {
  font-weight: bold;
  background-color: #e0e0e0;
  padding: 10px 0;
}

.calendar-date {
  border: 1px solid #ddd;
  height: 100px; /* 각 셀 높이 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.calendar-date:hover {
  background-color: #f0f8ff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-date {
  border: none;
  background-color: transparent;
}

.calendar-date span {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
