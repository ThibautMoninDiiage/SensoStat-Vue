<template>
  <div v-if="instruction !== undefined">
    <form @submit="startSurvey" id="mainContainer">
      <div id="title">{{ instruction.libelle }}</div>
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
        name: "StartPage",
        components: {
            MainButton,
            MicrophoneText,
        },
        data() {
            return {
                welcomeMessage : undefined,
                vocalCommand : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                SurveyService : new SurveyService(),
                AuthService : new AuthService(),
                position : 1,
                token : undefined,
                surveys : [],
                instructions : [],
                instruction : undefined
            }
        },
        async mounted() {
            this.vocalCommand = 'Cliquez sur le bouton, ou dites "Commencer"'

            this.token = this.AuthService.getTokenFromLocalStorage()
            this.surveys = await this.SurveyService.getSurvey(this.token)
            console.log(this.surveys);
            
            this.instructions = this.surveys.instructions
            this.instructions.forEach(instruction => {
                if (instruction.position == this.position) {
                    this.instruction = instruction
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
                router.push({
                    name: "InstructionPage",
                    params: { position: this.position },
                })
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
