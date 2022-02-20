<template>
    <form @submit="startSurvey" id="mainContainer">
        <div id="title">Bienvenue à notre séance de tests</div>
        <div id="subtitle">Aujourd'hui vous allez tester : {{ product }}</div>
        <MainButton class="itemCentered" message="Commencer la séance"/>
        <MicrophoneText class="itemCentered" message="Commencer la séance"/>
    </form>
</template>

<style scoped>
    @import '../../public/styles/main.css';
</style>

<script>
    import router from '../router/index'
    import MainButton from '../components/MainButton.vue'
    import MicrophoneText from '../components/MicrophoneText.vue'

    export default {
        name : 'StartPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                product : undefined
            }
        },
        mounted() {
            this.product = 'Savon de marseille'
        },
        methods : {
            startSurvey() {
                router.push({name : 'InstructionPage'})
            }
        }
    }
</script>
