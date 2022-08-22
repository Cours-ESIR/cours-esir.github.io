import type { RepositoryTree } from '@/types/Github';

export default class GithubService {
	public static readonly GITHUB_API_URL =
		'https://api.github.com/repos/Cours-ESIR/Cours/contents';
	public static readonly GITHUB_CONTRIB_URL =
		'https://api.github.com/repos/Cours-ESIR/Cours/contributors';
	public static readonly GITHUB_TREE_URL =
		'https://api.github.com/repos/Cours-ESIR/Cours/git/trees/main?recursive=1';
	public static readonly GITHUB_DATA_URL =
		'https://raw.githubusercontent.com/Cours-ESIR/Cours/main/';

	public static async fetchTree(): Promise<RepositoryTree> {
		let data = await fetch(this.GITHUB_TREE_URL);
		return await data.json();
	}

	public static async fetchFileContent(path: string): Promise<string> {
		let data = await fetch(this.GITHUB_DATA_URL + path);
		return await data.text();
	}

	public static async fetchContrib(): Promise<any> {
		let data = await fetch(this.GITHUB_CONTRIB_URL);
		return await data.json();
	}
}
