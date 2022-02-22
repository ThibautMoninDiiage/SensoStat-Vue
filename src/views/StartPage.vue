<template>
    <div>
        <form @submit="startSurvey" id="mainContainer">
            <div id="title">Bienvenue à notre séance de tests</div>
            <div id="subtitle">Aujourd'hui vous allez tester : {{ product }}</div>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Commencer la séance"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" message="Commencer la séance"/>
                    <router-view/>
                </div>
            </div>
        </form>
    </div>
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
            startSurvey(event) {
                event.preventDefault()
                router.push('/instructionPage')
            }
        }
    }
</script>
