<script setup lang="ts">
    import publisher from '@/composable/publisher.ts'
    import {reactive} from 'vue'
    
    const props = defineProps<{
        content;
        parent;
    }>();

    function change(name:string){
        publisher().folderSelected[0] = name
    }

    function unlock(item,path) : void{
        item.locked = ! item.locked
        if ( publisher().list_changed[path] ){
            delete publisher().list_changed[path]
        }
        else{
            publisher().list_changed[path] = { "action":"lock", "value":item.locked }
        }
    }

    function delete_item(item,path) : void{
        item.deleted = !item.deleted
        if ( publisher().list_changed[path] ){
            delete publisher().list_changed[path]
        }
        else{
            publisher().list_changed[path] = { "action":"delete" }
        }
    }
    
</script>

<template>
    <div style="user-select: none;">
        <div v-for="item in content">
            <div v-if="item.kind == 0 && item.display !== false" style="display: flex;">
                📄 {{item.name}}
                <div @click="unlock(item,parent+'/'+item.name)" style="cursor: pointer;">
                    <template v-if="item.locked == false">🔓</template>
                    <template v-else>🔒</template>
                </div>
                <div @click="delete_item(item,parent+'/'+item.name)" style="cursor: pointer;">
                    <template v-if="item.deleted == undefined || item.deleted == false">✔️</template>
                    <template v-else>❌</template>
                </div>
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