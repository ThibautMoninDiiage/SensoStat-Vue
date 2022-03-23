<template>
    <div v-if="welcomeMessage !== undefined">
        <form @submit="startSurvey" id="mainContainer">
            <div id="title">{{ welcomeMessage.libelle }}</div>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" :message="mainButtonText"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" :message="audioHelper"/>
                </div>
            </div>
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
        name: "WelcomePage",
        components: {
            MainButton,
            MicrophoneText,
        },
        data() {
            return {
                audioHelper : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                SurveyService : new SurveyService(),
                AuthService : new AuthService(),
                position : undefined,
                token : undefined,
                surveys : [],
                instructions : [],
                welcomeMessages : [],
                welcomeMessage : undefined,
                mainButtonText : undefined,
                isPlayerPaused : false
            }
        },
        async mounted() {
            this.position = this.$route.params.position

            this.token = this.AuthService.getTokenFromLocalStorage()
            this.surveys = await this.SurveyService.getSurvey(this.token)
            
            this.instructions = this.surveys.instructions

            this.instructions.forEach(instruction => {
                if (instruction.status == 0) {
                    this.welcomeMessages.push(instruction)
                }
            })

            this.welcomeMessages.forEach(welcomeMessage => {
                if (welcomeMessage.position == this.position) {
                    this.welcomeMessage = welcomeMessage
                }
            })

            var result = await this.STTService.speechToText()
            await this.writeReponse(result)
            this.changeMessage()
            this.speech()
        },
        methods: {
            async startSurvey() {
                event.preventDefault()
                this.incrementPosition()
                if (this.welcomeMessages.length !== this.position) {
                    router.push({
                        name: "WelcomePage",
                        params: { position: this.position },
                    })
                } else {
                    router.push({
                        name: "InstructionPage",
                        params: { position: this.position },
                    })
                }
            },
            async writeReponse(speechRecognizer) {
                speechRecognizer.recognizing = (s, e) => {
                    if (e.result.text.toLowerCase().includes("suivant") || e.result.text.toLowerCase().includes("commencer")) {
                        this.startSurvey()
                    }
                }
            },
            async changeMessage() {
                if (this.welcomeMessages.length - 1 !== this.position) {
                    this.mainButtonText = "Suivant"
                    this.audioHelper = 'Cliquez sur le bouton, ou dites "Suivant"'
                } else {
                    this.mainButtonText = "Commencer"
                    this.audioHelper = 'Cliquez sur le bouton, ou dites "Commencer"'
                }
            },
            async speech() {
                await this.TTSService.textToSpeech(this.welcomeMessage.libelle, this.isPlayerPaused)
                await this.TTSService.textToSpeech(this.audioHelper, this.isPlayerPaused)
            },
            async incrementPosition() {
                this.position ++
                String(this.position)
            }
        },
        watch : {
            position() {
                this.welcomeMessages.forEach(async (welcomeMessage) => {
                    if (welcomeMessage.position == this.position) {
                        this.welcomeMessage = welcomeMessage
                        this.speech()
                        this.changeMessage()
                    }
                })
            }
        } 
    }
</script>
