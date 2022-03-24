<template>
    <div v-if="message !== undefined">
        <form @submit="nextStep" id="mainContainer">
            <h1>{{ message.libelle }}</h1>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" :message="mainButtonText"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" :message="audioHelper"/>
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
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                AuthService : new AuthService(),
                surveyService : new SurveyService(),
                surveys : [],
                instructions : [],
                questions : [],
                instructionsQuestions : [],
                token : undefined,
                message : undefined,
                type : undefined,
                totalInstructionsQuestions : undefined,
                questionId : undefined
            }
        },
        async mounted() {
            this.mainButtonText = "Suivant"
            this.audioHelper = 'Cliquez sur le bouton, ou dites "Suivant"'
            this.position = this.$route.params.position
            this.totalInstructionsQuestions = this.$route.params.totalInstructionsQuestions

            this.token = this.AuthService.getTokenFromLocalStorage()

            this.surveys = await this.surveyService.getSurvey(this.token)
            this.instructions = this.surveys.instructions
            this.questions = this.surveys.questions

            this.instructions.forEach(instruction => {
                if (instruction.status == 1) {
                    this.instructionsQuestions.push(instruction)
                }
            })

            this.questions.forEach(question => {
                this.instructionsQuestions.push(question)
            })

            this.instructionsQuestions.forEach(message => {
                if (message.position == this.position) {
                    this.message = message
                }
            })

            var result = await this.STTService.speechToText()
            await this.writeReponse(result)
            this.verifyType()
            this.speech()
        },
        methods: {
            async nextStep() {
                event.preventDefault()
                if (this.type === "Instruction") {
                    this.incrementPosition()
                    router.push({
                        name : "InstructionPage",
                        params: {
                            position: this.position,
                            totalInstructionsQuestions : this.totalInstructionsQuestions
                        }
                    })
                } else {
                    router.push({
                        name: "AnswerPage",
                        params: {
                            position: this.position,
                            totalInstructionsQuestions : this.totalInstructionsQuestions
                        }
                    })
                }
            },
            async writeReponse(speechRecognizer) {
                speechRecognizer.recognizing = (s, e) => {  
                    if (e.result.text.toLowerCase().includes("suivant")) {
                        this.nextStep();
                    }
                }
            },
            async speech() {
                await this.TTSService.textToSpeech(this.message.libelle)
                await this.TTSService.textToSpeech(this.audioHelper)
            },
            async incrementPosition() {
                this.position ++
                String(this.position)
            },
            async verifyType() {
                if (this.message.status) {
                    this.type = "Instruction"
                } else {
                    this.type = "Question"
                    this.questionId = this.message.id
                }
            }
        },
        watch : {
            position() {
                this.instructionsQuestions.forEach(async (message) => {
                    if (message.position == this.position) {
                        this.message = message
                        this.verifyType()
                        this.speech()
                    }
                })
            }
        } 
    }
</script>
