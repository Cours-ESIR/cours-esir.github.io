<script lang="ts" setup>
    import {ref} from 'vue'
    import Github from '@/composable/GithubComposable';
    import GithubService from '@/services/GithubService';
    import router from '@/router'
    import TreeFolderPublisher from '@/components/Main/TreeFolderPublisher.vue';

    import publisher from '@/composable/publisher.ts'

    let selectedFolder = publisher().folderSelected
    let folder = ref(selectedFolder)
    let token = router.currentRoute.value.params.token


    let liste = ref( Github().root["children"] );


    (async() => {
        let tree2 = await GithubService.fetchTree(true,token);
        if (tree2.message == undefined){

            for (let item of tree2.tree){
	    	    item["locked"] = true
	        }

            for (let item of Github().tree1.tree){
	        	item["locked"] = false
	        }

            liste.value = Github().treeify(Github().tree1,tree2)
        }
    })()

    function send(){
        let folder_path = document.querySelector("#folder_path").value
        let filename = document.querySelector("#filename").value
        let file = document.querySelector("#file")
        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            let content = event.target.result

            let path = folder_path + "/" + filename + ".md"
        });
        reader.readAsText(file.files[0]);
    }

    function save() { publisher().save(token) }
</script>

<template>

    <div style="display:flex">
        <TreeFolderPublisher :content="liste" parent=""></TreeFolderPublisher>
        <div>
            <label type="text">Token Github </label>
            <input v-model="token" style="background-color: transparent;" type="text">
            <br/>
            <label type="text">Dossier Selectionné :</label>
            <input v-model="folder" style="background-color: transparent;" type="text">    
            <br/>
            <label>Nom du fichier </label>
            <input id="filename" style="background-color: transparent;" type="text">
            <br/>
            <label>Ficher </label>
            <input style="background-color: transparent;" id="file" type="file" accept=".md">
            <button style="background-color: transparent;" @click="send()">Ajouter</button>
            <button style="background-color: transparent;" @click="save()">Sauvegarder</button>
        </div>
    </div>

</template>