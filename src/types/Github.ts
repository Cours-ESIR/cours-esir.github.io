export interface RepositoryTree {
	sha: string;
	url: string;
	truncated: boolean;
	tree: RepositoryItem[];
}

export interface RepositoryContributor {}

export interface RepositoryItem {
	mode: number;
	path: string;
	sha: string;
	size: number;
	type: 'tree' | 'blob';
	url: string;
}
