<template>
    <div>
        <form @submit="nextStep" id="mainContainer">
            <h1>{{ instruction }} {{ product }} {{ productNumber }}</h1>
            <MainButton message="Étape suivante"/>
            <MicrophoneText message="Étape suivante"/>
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
        name : 'InstructionPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                instruction : undefined,
                product : undefined,
                productNumber : undefined,
                text : undefined,
                TTSService : new TextToSpeechService()
            }
        },
        mounted() {
            this.instruction = "Vous allez tester : "
            this.product = "Les chips"
            this.productNumber = 120
            this.text = this.instruction + this.product + this.productNumber
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
