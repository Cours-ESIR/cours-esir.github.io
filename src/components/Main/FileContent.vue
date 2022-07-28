<script lang="ts" setup>
import { ref, watch } from 'vue';
import GithubService from '@/services/GithubService';

// import { marked } from 'marked';
import type { KatexOptions } from 'katex';

const hljs = await (await import('highlight.js')).default;
const katex = await (await import('katex')).default;
const { marked } = await import('marked');

const options: KatexOptions = {
	displayMode: true,
	throwOnError: false,
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
	},
};

marked.use({
	extensions: [
		{
			name: 'latex-inline',
			level: 'inline',
			tokenizer(markdown: string, tokens) {
				let line = markdown.match(/.*?\$(.+?)\$/gs);
				if (line === null) return;

				console.log(line[1]);

				let first = line[0].indexOf('$');
				let last = line[0].indexOf('$', first + 1);

				this.lexer.inlineTokens(line[0].slice(0, first), tokens);

				return {
					raw: line[0],
					text: line[0].slice(first + 1, last),
					type: 'latex-inline',
				};
			},
			renderer(token) {
				return katex.renderToString(token.text);
			},
		},
		{
			name: 'latex-block',
			level: 'block',
			tokenizer(markdown: string, tokens) {
				let block = markdown.match(/^\${2}(?<latex>.*?)\${2}/gs);
				if (block === null) return;

				return {
					raw: block[0],
					text: block[0].slice(2, block[0].length - 2),
					type: 'latex-block',
				};
			},
			renderer(token) {
				return katex.renderToString(token.text, options);
			},
		},
	],
	renderer: {
		code(code: string, language: string) {
			if (!language) return code;
			return `<pre class="code">${
				hljs.highlight(code, { language }).value
			}</pre>`;
		},
	},
});

const props = defineProps<{
	path: string;
}>();

const content = ref('');

watch(props, async (NewProps) => {
	let raw = await GithubService.fetchFileContent(NewProps.path);
	content.value = marked.parse(raw);
});
</script>

<template>
	<main v-html="content"></main>
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
