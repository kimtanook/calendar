<template>
	<div class="wrap">
		<Calendar @set-date="(data) => (selectDate = data)" />
		<Schedule v-if="selectDate" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Calendar from './components/Calendar.vue';
import Schedule from './components/Schedule.vue';

const selectDate = ref();

// watch(
// 	() => selectDate.value,
// 	() => {
// 		console.log('selectDate.value : ', selectDate.value);
// 	}
// );
</script>

<style scoped lang="scss">
.wrap {
	display: flex;
}
</style>
