<template>
    <div class="pop" tabindex="-1">
        <button tabindex="-1" onclick="blur();">X</button>
        <content tabindex="-1"></content>
    </div>
</template>

<style scoped>

    .pop {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        opacity: 0;
        z-index: -500;
        padding: 16px;
        background-color: var(--compl);
    }

    .pop:focus,.pop:focus-within{
        opacity: 1;
        z-index: 500;
    }

</style>