<script lang="ts" setup>
import { ref, watch } from 'vue';
import GithubService from '@/services/GithubService';

/** New Markdown + highlightjs + katex support */
import md from 'markdown-it';
import hljs from 'highlight.js'
import mdhljs from 'markdown-it-highlightjs';
import mk from '@iktakahiro/markdown-it-katex';
import mdemoji from 'markdown-it-emoji';
import replacelink from 'markdown-it-replace-link'

const markdownit = md({
	html: true,
	replaceLink: function (link:string, env:any) {
		if (link.startsWith("http")){
			return link
		}
		else if (link.startsWith("/")) {
			return GithubService.GITHUB_DATA_URL + props.path.split("/").slice(0,-1).join("/") + link;
		}
		else {
			return GithubService.GITHUB_DATA_URL + props.path.split("/").slice(0,-1).join("/") + "/" + link;
		}
    }
}).use(replacelink);

markdownit
.use(mdhljs, {
	auto: true,
	ignoreIllegals: true,
	code: true,
	inline: false,
	hljs
})
.use(mk, {
	displayMode: true,
	throwOnError: true,

	macros: {
		'\\(': '\\lparen',
		'\\)': '\\rparen',
		'\\{': '\\lbrace',
		'\\}': '\\rbrace',
		'\\[': '\\lbrack',
		'\\]': '\\rbrack',
		'\\n': '\\\\ \\ \\\\',
		'\\vec': '\\overrightarrow{#1}',
		'\\embrace': '\\left#2\\begin{split} #1 \\end{split}\\right#3',
		'\\aembrace': '\\embrace{#1}{\\{}{\\}}',
		'\\pembrace': '\\embrace{#1}{\\(}{\\)}',
		'\\cembrace': '\\embrace{#1}{\\[}{\\]}',
		'\\abs': '\\displaystyle\\left\\lvert{#1}\\right\\rvert',
	}
})
.use(mdemoji)
.use(function underline(md) {
	function renderEm(tokens:any, idx:any, opts:any, _:any, slf:any) {
		let token = tokens[idx];
		if(token.markup === '_')
			token.tag = 'u';
		return slf.renderToken(tokens, idx, opts);
	}

	md.renderer.rules.em_open = renderEm;
	md.renderer.rules.em_close = renderEm;
});

const props = defineProps<{
	path: string;
}>();

const content = ref('');

watch(props, async (NewProps) => {
	let raw = await GithubService.fetchFileContent(NewProps.path);

	content.value = markdownit.render(raw);
});
</script>

<template>
	<main class="cours" v-html="content"></main>
</template>

<style scoped>
main {
	display: block;
	width: 100%;
	height: 100%;
	left: 0px;
	flex: auto;
}
</style>
