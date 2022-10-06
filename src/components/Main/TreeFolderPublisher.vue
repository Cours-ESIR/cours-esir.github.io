<script setup lang="ts">
    import publisher from '@/composable/publisher'
    
    type noeud = {kind:number,display:boolean,name:string,children:noeud}

    const props = defineProps<{
        content:noeud[];
        parent:string;
    }>();

    function change(name:string){
        publisher().folderSelected[0] = name
    }
    
</script>

<template>
    <div style="user-select: none;">
        <div v-for="item in content">
            <div v-if="item.kind == 0 && item.display !== false" style="display: flex;">
                📄 {{item.name}}
            </div>
            <div @click="change(parent+'/'+item.name)" style="cursor: pointer;" v-else-if="item.name !== undefined">
                📂 {{item.name}}
            </div>
            <div v-if="item.kind == 1" style="margin-left:20px;">
                <TreeFolderPublisher :parent="parent+'/'+item.name" :content="item.children"></TreeFolderPublisher>
            </div>
        </div>
    </div>
</template>