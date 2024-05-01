<template>
	<div class="wrap">
		<div class="header">
			<img class="before-btn" src="@/assets/image/angle-left.png" @click="beforeMonth" alt="Previous Month" />
			<div class="year-month">{{ format(currentDate, 'MMMM yyyy') }}</div>
			<img class="after-btn" src="@/assets/image/angle-right.png" @click="afterMonth" alt="Next Month" />
		</div>
		<div class="days-title">
			<span v-for="day in dayOfTheWeek">{{ day }}</span>
		</div>
		<div class="days-wrap">
			<div v-for="(week, index) in rows" :key="`week-${index}`" class="week">
				<div v-for="(day, index) in week" :key="index" :class="dayClasses(day)" @click="onClickDate(day)">
					<div>
						{{ format(day, 'd') }}
					</div>
					<div class="date_work">
						{{ dateWork(day) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	addDays,
	addMonths,
	endOfMonth,
	endOfWeek,
	format,
	isSameDay,
	isSameMonth,
	startOfMonth,
	startOfWeek,
	subMonths,
} from 'date-fns';
import { computed, ref } from 'vue';

// 공수관련 목업데이터
const mockupData = [
	{ date: '2024-05-02', work: '1' },
	{ date: '2024-05-04', work: '2' },
	{ date: '2024-05-08', work: '0.5' },
	{ date: '2024-05-11', work: '0.5' },
	{ date: '2024-05-17', work: '1' },
	{ date: '2024-05-30', work: '2' },
];

const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'];

const emit = defineEmits(['set-date']); // 스케쥴을 위한 emit

const setUserDate = ref(''); // 사용자가 선택한 날짜를 저장
const currentDate = ref(new Date()); // 현재 날짜를 저장
const selectDate = ref(null); // 선택된 날짜를 저장

const monthStart = computed(() => startOfMonth(currentDate.value)); // 현재 월의 시작일을 계산
const monthEnd = computed(() => endOfMonth(monthStart.value)); // 현재 월의 마지막일을 계산
const startDate = computed(() => startOfWeek(monthStart.value)); // 현재 월의 시작 요일을 계산
const endDate = computed(() => endOfWeek(monthEnd.value)); // 현재 월의 마지막 요일을 계산

// 달력에 표시될 날짜들을 계산하는 computed 속성
const rows = computed(() => {
	const weeks = [];
	let days = [];
	let day = startDate.value;
	let dayIndex = 0;

	while (day <= endDate.value) {
		for (let i = 0; i < 7; i++) {
			days.push(day);
			day = addDays(day, 1);
			dayIndex++;
		}
		weeks.push([...days]);
		days = [];
	}
	return weeks;
});

// 선택된 날짜의 작업량을 반환하는 함수
const dateWork = (date: any) => {
	let work;
	mockupData.map((item: any) => {
		if (item.date === format(date, 'yyyy-MM-dd')) {
			work = item.work;
			return;
		}
	});
	return work;
};

// 이전 달로 이동하는 함수
const beforeMonth = () => {
	currentDate.value = subMonths(currentDate.value, 1);
};

// 다음 달로 이동하는 함수
const afterMonth = () => {
	currentDate.value = addMonths(currentDate.value, 1);
};

// 날짜를 클릭했을 때 처리하는 함수
const onClickDate = (day: any) => {
	selectDate.value = day;
	setUserDate.value = format(day, 'yyyyMMdd');
	emit('set-date', { month: format(day, 'MM'), day: format(day, 'dd') }); // 스케쥴을 위한 emit
};

// 각 날짜에 대한 클래스를 반환하는 함수
const dayClasses = (day: any) => ({
	day: true,
	'not-current-month': !isSameMonth(day, monthStart.value),
	weekend: ['Sun', 'Sat'].includes(format(day, 'EEE')),
	'selected-day': isSameDay(day, selectDate.value),
});
</script>

<style scoped lang="scss">
.wrap {
	width: 50vw;
	height: 50vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	border: 1px solid black;
}
.header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 4rem;
	border-bottom: 1px solid black;
}
.before-btn,
.after-btn {
	width: 20px;
	height: 20px;
	margin: 4px;
	cursor: pointer;
	opacity: 0.4;
}
.before-btn:hover,
.after-btn:hover {
	opacity: 1;
}
.year-month {
	background-color: aqua;
}
.week {
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.days-title {
	border: 1px solid red;
	display: flex;
	justify-content: space-around;
}
.days-wrap {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
.day {
	border: 0.5px solid rgb(234, 234, 234);
	padding: 0.5rem;
	width: 100%;
	color: #000000;
	cursor: pointer;
}

.weekend {
	color: red;
}
.day.not-current-month {
	color: #eaeaea;
}
.day.selected-day {
	background-color: rgb(225, 225, 225);
}
.date_work {
	color: blue;
}
</style>
