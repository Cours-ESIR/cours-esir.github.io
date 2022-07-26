export enum ItemKind {
	file,
	folder,
}

export interface ItemData {
	name: string;
	kind: ItemKind;
	url?: string;
}

export interface TreeItem extends ItemData {
	children: TreeItem[];
}
