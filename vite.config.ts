import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: [
			// import 경로 수정
			{ find: '@', replacement: path.resolve(__dirname, './src') },
		],
	},
});
