<script lang="ts" setup>
import { ref,onMounted } from 'vue';
import router from '@/router/Router.vue';
import usePath from '@/commposable/PathComposable';

import GithubService from '@/services/GithubService';

const path = usePath();

const currentNode = ref([]);

async function pushChild(): void {
    currentNode.value = await GithubService.getAllFilesPath( path.getFullPath() );
}

onMounted( ()=> {
    pushChild();   
}
);

function getIcon(kind): string {
    return (kind === "folder") ? 'gg-folder' : 'gg-file';
}

function changepath(child) {
    if(child.kind === "file") {
        router.set(
            "/viewer"
            + "?folder=" + path.getFullPath()
            + "&file=" + child.name + '.md'
        )
        return;
    };
    path.path.push(child.name);
    pushChild();
}

</script>

<template>
    <main class="folder-grid">
        <template v-for="child in currentNode">
            <div @click="changepath(child)" :class="child.kind">
                <i :class="getIcon(child.kind)"></i>
                <p class="node-text">{{ child.name }}</p>
            </div>
        </template>
    </main>
</template>

<style scoped>

.return {
    display: grid;
    place-items: center;
    height:50px;
    width:50px;

}

.node-text{
    margin:0;
    text-overflow: ellipsis;
    overflow:hidden;
    max-width:100%;
    white-space: nowrap;
}

.folder-grid {
    display: grid;
    grid-gap: 20px;
    grid-auto-rows: minmax(100px, 100px);

    grid-template-columns: repeat(3, calc( ( 100% - 2 * 20px ) / 3 ));

    overflow: auto;
    height: 100%;
}

.folder,.file {
    border-radius: 1.5rem;
    padding: 12px;
    display: grid;
    place-items: center;
    transition: 0.3s;
}

.folder{
    border: solid 3px var(--blue);
}
.file {
    border: solid 3px var(--green);
}

.file:hover {
    background-color:var(--green);
}

.folder:hover {
    background-color:var(--blue);
}

.folder:hover * , .file:hover * {
    color:var(--text-reverse) !important;
}

@media screen and (max-width:500px) {
    .folder-grid{
        grid-template-columns: repeat(1, 100%);
    }
}

</style>
