<template>
    <div>
        <form @submit="nextStep" id="mainContainer">
            <h1>{{ instruction }}</h1>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Étape suivante"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" message="Étape suivante"/>
                </div>
            </div>
            <router-view/>
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
    import TextToSpeechService from '../services/textToSpeechService'

    export default {
        name : 'QuestionPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                instruction : undefined,
                text : undefined,
                TTSService : new TextToSpeechService()
            }
        },
        mounted() {
            this.instruction = "Avez vous trouvé que chips 23 était salée ?"
            this.text = this.instruction
            this.TTSService.textToSpeech(this.text)
        },
        methods : {
            nextStep(event) {
                event.preventDefault()
                router.push('/answerPage')
            }
        }
    }
</script>
