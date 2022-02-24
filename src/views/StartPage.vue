<template>
    <div>
        <form @submit="startSurvey" id="mainContainer">
            <div id="title">{{ title }}</div>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Commencer la séance"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" message="Commencer"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import router from '../router/index'
    import MainButton from '../components/MainButton.vue'
    import MicrophoneText from '../components/MicrophoneText.vue'
    import TextToSpeechService from '../services/textToSpeechService'

    export default {
        name : 'StartPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                title : undefined,
                TTSService : new TextToSpeechService()
            }
        },
        mounted() {
            this.title = 'Bienvenue à notre séance de tests'
            this.TTSService.textToSpeech(this.title)
        },
        methods : {
            startSurvey(event) {
                event.preventDefault()
                router.push('/instructionPage')
            }
        }
    }
</script>
