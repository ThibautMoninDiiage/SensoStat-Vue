<template>
    <button class="orangeRoundedButton">{{ message }}</button>
</template>

<style scoped>
    @import '../../public/styles/mainButton.css';
    @import '../../public/styles/main.css';
</style>

<script>
    export default {
        name : 'MainButton',
        props : {
            message : String
        }
    }
</script>
