import { reactive } from 'vue';
import router from '@/router/index';

let path = reactive<string[]>([]);

export default function () {
	const getFullPath = () => {
		return path.join('/');
	};

	const loadPath = () => {

		for( let i in path){
			path.pop();
		}

		let path_str = router.currentRoute.value.params.path
		if ( typeof(path_str) === "string"){
			path_str = path_str.replaceAll("+"," ")
		}
		else{
			path_str = path_str.join("/").replaceAll("+"," ")
		}

		for (let item of path_str.split("/") ) {
			if (item !=="") path.push(item)
		}
	}

	const stepForward = ( child : string ) => {
		path.push(child)
		router.push({
			path: `/lessons/${path.join('/')}`.replaceAll(" ","+"),
		});
	}

	const stepBack = (count: number) => {
		// you can not go befor the root folder
		// root folder being hard coded it's ok to have 'path' empty
		if(count > path.length) return;

		for(let i = 0; i < count; i++){
			path.pop();
		}

		router.push({
			path: `/lessons/${path.join('/')}`.replaceAll(" ","+"),
		});
	};

	// TODO: try to find a way to refer to 'path.length' directly (maybe a ref / reactive / computed variable)
	return {
		path,
		stepForward,
		getFullPath,
		stepBack,
		loadPath
	};
}
