import { reactive } from 'vue';

const path = reactive<string[]>([]);

export default function () {
	const getFullPath = () => {
		return '/' + path.join('/');
	};

	return {
		path,
		getFullPath,
	};
}
