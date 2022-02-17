<template>
    <div id="mainContainer">
        <div id="title">Bienvenue à notre séance de tests</div>
        <div id="subtitle">Aujourd'hui vous allez tester : {{ product }}</div>
        <MainButton message="Commencer la séance"/>
        <div id="subtitle">ou dites "Commencer la séance"</div>
    </div>
</template>

<style scoped>
    @import '../../public/styles/main.css';
</style>

<script>
    import MainButton from '../components/MainButton.vue'

    export default {
        name : 'StartPage',
        components : {
            MainButton
        },
        data() {
            return {
                product : undefined
            }
        },
        mounted() {
            this.product = 'Savon de marseille'
        }
    }
</script>
