<script lang="ts" setup>
import { ref } from 'vue';
import useGithub from '@/composable/GithubComposable';

const github = useGithub();

const input         = ref('');
const list_filtered = ref<string[]>([]);

function filter() {
    let text = input.value.toUpperCase();
    list_filtered.value = [];

    if(text.length === 0) return;

    for (let file of github.files){
        if (file.toUpperCase().includes(text)) {
            list_filtered.value.push(file);
        }
    }
}
</script>

<template>
    <main>
        <div class="input">
            <icon>
                <i class="gg-search"></i>
            </icon>
            <input v-model="input" @input="filter">
        </div>
        <template v-for="file of list_filtered">
            <p>{{ file }}</p>
        </template>
    </main>
</template>

<style scoped>
    .input {
        display: flex;
        border: 3px solid var(--text);
        flex-wrap: nowrap;
        border-radius:1.5rem;
        transition:0.5s;
    }

    .input > *:nth-child(2) {
        all:unset;
        width:100%;
        background-color: transparent;
        padding: 8px 0px;
        transition:0.5s;
    }

    .input > *:nth-child(1){
        width:41px;
        display: grid;
        place-items: center;
    }

    i {
        transition:0.5s;
    }

    .input:focus-within, .input:hover {
        border: 3px solid var(--green);
    }
    .input:focus-within * , .input:hover *{
        color:var(--green);
    }

</style>