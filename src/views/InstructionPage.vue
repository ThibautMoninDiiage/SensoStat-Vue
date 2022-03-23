<template>
    <div v-if="instructions !== undefined">
        <form @submit="nextStep" id="mainContainer">
        <h1>{{ instructions[position] }}</h1>
        <div id="microphoneContainer">
            <MainButton class="itemCentered" :message="mainButtonText" />
            <div id="iconText">
            <i class="fa-solid fa-microphone"></i>
            <MicrophoneText class="itemCentered" :message="audioHelper" />
            </div>
        </div>
        <router-view />
        </form>
    </div>
</template>

<script>
    import router from "../router/index"
    import MainButton from "../components/MainButton.vue"
    import MicrophoneText from "../components/MicrophoneText.vue"
    import TextToSpeechService from "../services/textToSpeechService"
    import SpeechToTextService from "../services/speechToTextService"
    import SurveyService from "../services/surveyService"
    import AuthService from '../services/authService'

    export default {
        name: "InstructionPage",
        components: {
            MainButton,
            MicrophoneText,
        },
        data() {
            return {
                position : undefined,
                audioHelper : undefined,
                mainButtonText : undefined,
                text : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                AuthService : new AuthService(),
                surveyService : undefined,
                surveys : [],
                instructions : [],
                questions : [],
                surveyState : undefined,
                token : undefined
            }
        },
        async mounted() {
            this.mainButtonText = "Suivant"
            this.audioHelper = 'Cliquez sur le bouton, ou dites "Suivant"'
            this.position = this.$route.params.position

            this.token = this.AuthService.getTokenFromLocalStorage()

            this.surveyService = new SurveyService()
            this.surveys = await this.surveyService.getSurvey(this.token)
            console.log(this.surveys);
            this.instructions = this.surveys.instructions
            this.questions = this.surveys.questions
            this.surveyState = this.surveys.surveyState.libelle

            await this.TTSService.textToSpeech("Mangez le produit" + this.productNumber)
            await this.TTSService.textToSpeech(this.audioHelper)

            var result = await this.STTService.speechToText()
            await this.writeReponse(result)
        },
        methods: {
            async nextStep() {
                event.preventDefault()
                router.push({ name: "AnswerPage", params: { position: this.position }})
            },
            async writeReponse(speechRecognizer) {
                speechRecognizer.recognizing = (s, e) => {
                    if (e.result.text.toLowerCase().includes("suivant")) {
                        this.nextStep();
                    }
                }
            }
        }
    }
</script>
