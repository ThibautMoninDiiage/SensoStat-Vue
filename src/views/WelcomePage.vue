<template>
  <div v-if="welcomeMessage !== undefined">
    <form @submit="startSurvey" id="mainContainer">
      <div id="title">{{ welcomeMessage }}</div>
      <div id="microphoneContainer">
        <MainButton class="itemCentered" message="Commencer la séance" />
        <div id="iconText">
          <i class="fa-solid fa-microphone"></i>
          <MicrophoneText class="itemCentered" :message="vocalCommand" />
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
                vocalCommand : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                SurveyService : new SurveyService(),
                AuthService : new AuthService(),
                position : undefined,
                token : undefined,
                surveys : [],
                instructions : [],
                welcomeMessages : [],
                welcomeMessage : undefined
            }
        },
        async mounted() {
            this.vocalCommand = 'Cliquez sur le bouton, ou dites "Commencer"'
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

            await this.TTSService.textToSpeech(this.instruction)
            await this.TTSService.textToSpeech(this.vocalCommand)

            var result = await this.STTService.speechToText()
            await this.writeReponse(result)
        },
        methods: {
            async startSurvey() {
                event.preventDefault()
                await this.TTSService.stopTextToSpeech()
                this.position ++
                String(this.position)
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
                    if (e.result.text.toLowerCase().includes("commencer")) {
                        this.startSurvey()
                    }
                }
            }
        }
    }
</script>
