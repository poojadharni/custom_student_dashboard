<template>
  <div class="h-full w-full bg-gradient-to-br from-[#fff0f8] via-[#fff7fc] to-[#ffe4f3] p-4">
    <!-- MAIN CONTAINER -->
    <div class="h-full overflow-hidden rounded-[32px]
             border border-white/40
             bg-white/70
             backdrop-blur-xl
             shadow-[0_15px_50px_rgba(200,73,154,0.20)]">
      <Calendar v-if="!scheduleResource.loading && scheduleResource.data" :events="events" class="modern-calendar" />
    </div>
  </div>
</template>

<script setup>
import Calendar from '@/components/Calendar.vue'
import { createResource } from 'frappe-ui'
import { ref } from 'vue'
import { studentStore } from '@/stores/student'

const { getCurrentProgram, getStudentGroups } = studentStore()

const programName = ref(getCurrentProgram()?.value?.program)
const studentGroup = ref(getStudentGroups().value)

const events = ref([])

const scheduleResource = createResource({
  url: 'education.education.api.get_course_schedule_for_student',

  params: {
    program_name: programName.value,
    student_groups: studentGroup.value,
  },

  onSuccess: (response) => {
    let schedule = []

    response.forEach((classSchedule) => {
      schedule.push({
        title: classSchedule.title,
        with: classSchedule.instructor,
        name: classSchedule.name,
        room: classSchedule.room,
        date: classSchedule.schedule_date,
        from_time: classSchedule.from_time.split('.')[0],
        to_time: classSchedule.to_time.split('.')[0],
        color: '#C8499A',
      })
    })

    events.value = schedule
  },

  auto: true,
})
</script>

<style>
/* =========================
   CALENDAR ROOT
========================= */

.modern-calendar {
  height: 100%;
  padding: 18px;
  border-radius: 28px;
  overflow: hidden;
}

/* =========================
   TOOLBAR
========================= */

.modern-calendar .fc-toolbar {
  padding: 22px;

  border-radius: 28px;

  background:
    linear-gradient(135deg,
      #C8499A 0%,
      #e96ab9 100%);

  box-shadow:
    0 10px 35px rgba(200, 73, 154, 0.25);

  margin-bottom: 18px !important;
}

/* TITLE */

.modern-calendar .fc-toolbar-title {
  color: white;
  font-size: 32px !important;
  font-weight: 800;
  letter-spacing: 0.5px;
}

/* BUTTONS */

.modern-calendar .fc-button {
  background: rgba(255, 255, 255, 0.18) !important;

  border: 1px solid rgba(255, 255, 255, 0.2) !important;

  color: white !important;

  border-radius: 14px !important;

  padding: 8px 16px !important;

  font-weight: 600 !important;

  transition: all 0.25s ease;
}

/* BUTTON HOVER */

.modern-calendar .fc-button:hover {
  background: white !important;
  color: #C8499A !important;

  transform: translateY(-2px);
}

/* ACTIVE BUTTON */

.modern-calendar .fc-button-active {
  background: white !important;
  color: #C8499A !important;
}

/* =========================
   HEADER DAYS
========================= */

.modern-calendar .fc-col-header {
  border-radius: 18px;
  overflow: hidden;
}

.modern-calendar .fc-col-header-cell {
  background: #fff4fa;
  border-color: #ffe1f0 !important;

  padding: 16px 0 !important;
}

.modern-calendar .fc-col-header-cell-cushion {
  color: #C8499A !important;

  text-decoration: none !important;

  font-size: 15px;
  font-weight: 700;
}

/* =========================
   GRID
========================= */

.modern-calendar .fc-scrollgrid {
  border: none !important;
}

.modern-calendar td,
.modern-calendar th {
  border-color: #ffe5f2 !important;
}

/* =========================
   DAY CELL
========================= */

.modern-calendar .fc-daygrid-day {
  background: rgba(255, 255, 255, 0.65);

  transition: all 0.25s ease;
}

.modern-calendar .fc-daygrid-day:hover {
  background: #fff5fa;
}

/* TODAY */

.modern-calendar .fc-day-today {
  background: #ffe6f3 !important;
}

/* DATE NUMBER */

.modern-calendar .fc-daygrid-day-number {
  color: #777;

  font-size: 15px;
  font-weight: 700;

  padding: 10px;

  text-decoration: none !important;
}

/* =========================
   MODERN EVENT CARD
========================= */

.modern-calendar .fc-event {

  border: none !important;

  border-radius: 18px !important;

  background:
    linear-gradient(135deg,
      #ffffff 0%,
      #fff4fa 100%) !important;

  overflow: hidden;

  padding: 0 !important;

  margin: 6px !important;

  box-shadow:
    0 6px 18px rgba(200, 73, 154, 0.12);

  transition: all 0.28s ease;
}

/* EVENT HOVER */

.modern-calendar .fc-event:hover {

  transform:
    translateY(-4px) scale(1.02);

  box-shadow:
    0 12px 30px rgba(200, 73, 154, 0.22);

  background:
    linear-gradient(135deg,
      #ffe8f5 0%,
      #ffffff 100%) !important;
}

/* REMOVE OLD DEFAULT */

.modern-calendar .fc-event-main {
  padding: 0 !important;
}

/* CUSTOM INNER DESIGN */

.modern-calendar .fc-event-main-frame {

  display: flex !important;

  align-items: center;

  gap: 10px;

  padding: 12px;
}

/* LEFT ICON AREA */

.modern-calendar .fc-event-main-frame::before {

  content: "";

  width: 12px;
  height: 12px;

  border-radius: 999px;

  background: linear-gradient(135deg,
      #C8499A,
      #ff9ad1);

  box-shadow:
    0 0 10px rgba(200, 73, 154, 0.45);

  flex-shrink: 0;
}

/* EVENT TEXT AREA */

.modern-calendar .fc-event-title-container {

  display: flex;
  flex-direction: column;
}

/* SUBJECT */

.modern-calendar .fc-event-title {

  color: #333 !important;

  font-size: 13px;
  font-weight: 700;

  line-height: 1.3;

  margin-bottom: 3px;
}

/* TIME */

.modern-calendar .fc-event-time {

  color: #C8499A !important;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 0.3px;
}

/* =========================
   ANIMATION
========================= */

.modern-calendar .fc-event {
  animation: fadeInUp 0.35s ease;
}

@keyframes fadeInUp {

  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }

}

/* =========================
   SCROLLBAR
========================= */

.modern-calendar ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.modern-calendar ::-webkit-scrollbar-thumb {
  background: #d96aad;
  border-radius: 999px;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 768px) {

  .modern-calendar {
    padding: 10px;
  }

  .modern-calendar .fc-toolbar {
    padding: 16px;
  }

  .modern-calendar .fc-toolbar-title {
    font-size: 22px !important;
  }

}
</style>