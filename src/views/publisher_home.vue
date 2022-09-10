<script lang="ts" setup>
import {ref} from 'vue'

let token = ref("")

</script>

<template>
    <div>
        <label type="text">Token Github </label>
        <input v-model="token" style="background-color: transparent;" type="text">
        <router-link :to="'/publisher/'+token">Entrer</router-link>
    </div>
</template>