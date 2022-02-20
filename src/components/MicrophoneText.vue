<template>
    <div>
        <h3 id="mainMessage">ou dites "{{ message }}"</h3>
    </div>
</template>

<style scoped>
    @import '../../public/styles/main.css';
</style>

<script>
    export default {
        name : 'MicrophoneText',
        props : {
            message : String
        }
    }
</script>
