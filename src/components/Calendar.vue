<template>
	<div class="wrap">
		<div class="header">
			<img class="before-btn" src="@/assets/image/angle-left.png" @click="beforeMonth" alt="Previous Month" />
			<div class="year-month">{{ format(currentDate, 'MMMM yyyy') }}</div>
			<img class="after-btn" src="@/assets/image/angle-right.png" @click="afterMonth" alt="Next Month" />
		</div>
		<div class="days-wrap">
			<div v-for="(week, index) in rows" :key="`week-${index}`" class="week">
				<div v-for="(day, index) in week" :key="index" :class="dayClasses(day)" @click="onClickDate(day)">
					{{ format(day, 'd') }}
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
import { computed, ref, watch } from 'vue';

const emit = defineEmits(['set-date']);

const setUserDate = ref('');
const setToday = ref('');

const currentDate = ref(new Date());
const selectDate = ref(null);

const selectFormatDate = ref();

const beforeMonth = () => {
	currentDate.value = subMonths(currentDate.value, 1);
};

const afterMonth = () => {
	currentDate.value = addMonths(currentDate.value, 1);
};

const onClickDate = (day: any) => {
	selectDate.value = day;
	setUserDate.value = format(day, 'yyyyMMdd');
	setToday.value = format(day, 'yyyy / MM / dd');
	emit('set-date', { month: format(day, 'MM'), day: format(day, 'dd') });
};

const monthStart = computed(() => startOfMonth(currentDate.value));
const monthEnd = computed(() => endOfMonth(monthStart.value));
const startDate = computed(() => startOfWeek(monthStart.value));
const endDate = computed(() => endOfWeek(monthEnd.value));

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

.day.weekend {
	color: red;
}
.day.not-current-month {
	color: #eaeaea;
}
.day.selected-day {
	background-color: rgb(225, 225, 225);
}
</style>
