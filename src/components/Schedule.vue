<template>
	<div class="wrap">
		<div class="box">
			<div v-for="(item, index) in mockupDate" :key="index">
				<div>{{ item.title }}</div>
				<div>{{ item.content }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const mockupDate = ref([
	{ title: '일정 1', content: '일정 컨텐츠 1' },
	{ title: '일정 2', content: '일정 컨텐츠 2' },
	{ title: '일정 3', content: '일정 컨텐츠 3' },
	{ title: '일정 4', content: '일정 컨텐츠 4' },
]);
</script>
<style scoped lang="scss">
.wrap {
	display: flex;
	flex-direction: column;
	border: 1px solid red;
	width: 40vw;
	padding: 1rem;
	.box {
		border: 1px solid blue;
	}
}
</style>
