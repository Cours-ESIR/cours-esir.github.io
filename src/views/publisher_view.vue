<script lang="ts" setup>
    import {ref} from 'vue'
    import Github from '@/composable/GithubComposable';
    import router from '@/router'
    import TreeFolderPublisher from '@/components/Main/TreeFolderPublisher.vue';
    import publisher from '@/composable/publisher.ts'

    let folder = publisher().folderSelected
    let filename = ref("")
    let token = ref(router.currentRoute.value.params.token)
    let title = ref("")
    let description = ref("")

    let liste = ref( Github().root["children"] );

    function send(){
        let file = document.querySelector("#file")
        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            let content = event.target.result

            let path = folder[0] + "/" + filename.value + ".md"
            
            publisher().upload(token.value,content,path,title.value,description.value)
        });
        reader.readAsText(file.files[0]);
    }
</script>

<template>

    <div style="display:flex">
        <TreeFolderPublisher :content="liste" parent=""></TreeFolderPublisher>
        <div>
            <label type="text">Token Github :</label>
            <input v-model="token" style="background-color: transparent;color:var(--text)" type="text">
            <br/>
            <label type="text">Dossier Selectionné :</label>

            <input v-model="folder[0]" style="background-color: transparent; color:var(--text)" type="text">    
            <br/>
            <label>Nom du fichier :</label>
            <input v-model="filename" style="background-color: transparent;color:var(--text)" type="text">
            <br/>
            <label>Fichier :</label>
            <input style="background-color: transparent;" id="file" type="file" accept=".md">


            <label>Titre :</label>
            <input v-model="title" style="background-color: transparent;color:var(--text)" type="text">
            <br/>
            <label>Description :</label>
            <input v-model="description" style="background-color: transparent;color:var(--text)" type="text">
            <br/>

            <button style="background-color: transparent;" @click="send()">Ajouter</button>
        </div>
    </div>

</template>