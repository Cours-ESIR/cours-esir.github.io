import { reactive } from 'vue';
import { ItemKind, type TreeItem } from '@/types/Tree';
import type { RepositoryTree } from '@/types/Github';
import GithubService from '@/services/GithubService';

const root = reactive<TreeItem>({
	name: 'home',
	kind: ItemKind.folder,
	children: [],
});
const files = reactive<string[]>([]);
const folders = reactive<string[]>([]);

function getNodeFromPath(path: string[]): TreeItem {
	let item: TreeItem | undefined = root;
	for (let part of path) {
		item = item?.children.find((el: { name: string }) => {
			return el.name === part;
		});
	}
	return item ?? root;
}

export default async function () {
	let data: RepositoryTree = await GithubService.fetchTree();

	for (let item of data.tree) {
		let currentNode = root;
		item.type === 'blob' ? files.push(item.path) : folders.push(item.path);
		let path: string[] = item.path.split('/');
		for (let part of path) {
			let exists = currentNode.children.find((el: { name: string }) => {
				return el.name === part;
			});
			if (exists) {
				currentNode = exists;
			} else {
				if (
					path.indexOf(part) < path.length - 1 ||
					item.type === 'tree'
				) {
					// the current part is a folder
					currentNode.children.push({
						name: part,
						kind: ItemKind.folder,
						children: [],
					});
				} else {
					// the current part is a file
					currentNode.children.push({
						name: part.split('.')[0], // remove extension for the name
						kind: ItemKind.file,
						children: [],
						url: `${GithubService.GITHUB_DATA_URL}/${item.path}`,
					});
				}
				currentNode =
					currentNode.children[currentNode.children.length - 1];
			}
		}
	}

	return {
		root,
		files,
		folders,
		getNodeFromPath,
	};
}
