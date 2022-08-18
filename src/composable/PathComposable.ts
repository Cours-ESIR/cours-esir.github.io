import { reactive } from 'vue';

const path = reactive<string[]>([]);

export default function () {
	const getFullPath = () => {
		return path.join('/');
	};

	const stepBack = (count: number) => {
		// you can not go befor the root folder
		// root folder being hard coded it's ok to have 'path' empty
		if(count > path.length) return;

		for(let i = 0; i < count; i++)
			path.pop();
	};

	// TODO: try to find a way to refer to 'path.length' directly (maybe a ref / reactive / computed variable)
	return {
		path,
		getFullPath,
		stepBack,
	};
}
