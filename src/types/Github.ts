export interface RepositoryTree {
	sha: string;
	url: string;
	truncated: boolean;
	tree: RepositoryItem[];
};

export interface RepositoryItem {
	mode: number;
	path: string;
	sha: string;
	size: number;
	type: 'tree' | 'blob';
	url: string;
};

export interface RepositoryContributor {
	login: string;
	avatar_url: string;
	url: string;
	type: string;
	path: string;
	mode: string;
	sha: string;
};

export type Contributors = RepositoryContributor[];
