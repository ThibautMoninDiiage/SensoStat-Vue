<template>
    <div v-if="introduction !== undefined">
        <form @submit="startSurvey" id="mainContainer">
            <div id="title">{{ introduction.libelle }}</div>
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
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                SurveyService : new SurveyService(),
                AuthService : new AuthService(),
                surveys : [],
                instructions : [],
                introductions : [],
                instructionsUnique : [],
                audioHelper : undefined,
                position : undefined,
                token : undefined,
                introduction : undefined,
                mainButtonText : undefined,
                totalInstructionsQuestions : undefined,
                totalProducts : undefined
            }
        },
        async mounted() {
            this.getParamsFromLocalStorage()

            this.surveys = await this.SurveyService.getSurvey(this.token)
            this.instructions = this.surveys.instructions

            this.instructions.forEach(instruction => {
                if (instruction.status == 0) {
                    this.introductions.push(instruction)
                }
            })
            
            this.instructions.forEach(instruction => {
                if (instruction.status == 1) {
                    this.instructionsUnique.push(instruction)
                }
            })

            this.introductions.forEach(introduction => {
                if (introduction.position == this.position) {
                    this.introduction = introduction
                }
            })

            this.setParamsToLocalStorage()
            this.setHelperMessage()
            this.speech()
            await this.writeReponse(await this.STTService.speechToText())
        },
        methods: {
            async startSurvey() {
                event.preventDefault()
                this.TTSService.finalize()
                this.incrementPosition()
                if (this.introductions.length !== this.position) {
                    router.push({
                        name: "WelcomePage"
                    })
                } else {
                    this.setParamsToLocalStorage()
                    router.push({
                        name: "InstructionPage"
                    })
                }
            },
            async writeReponse(speechRecognizer) {
                speechRecognizer.recognized = (s, e) => {
                    if (e.result.text.toLowerCase().includes("cliquez") && e.result.text.toLowerCase().includes("suivant")){
                    }
                    else if (e.result.text.toLowerCase().includes("suivant") || e.result.text.toLowerCase().includes("commencer")) {
                        this.startSurvey()
                    }
                }
            },
            async speech() {
                await this.TTSService.initialize(this.introduction.libelle)
                await this.TTSService.initialize(this.audioHelper)
            },
            async incrementPosition() {
                this.position ++
            },
            setHelperMessage() {
                if (this.introductions.length - 1 !== this.position) {
                    this.mainButtonText = "Suivant"
                    this.audioHelper = 'Cliquez sur le bouton, ou dites Suivant'
                } else {
                    this.mainButtonText = "Commencer"
                    this.audioHelper = 'Cliquez sur le bouton, ou dites Commencer'
                }
            },
            getParamsFromLocalStorage() {
                this.token = this.AuthService.getTokenFromLocalStorage()
                this.position = localStorage.getItem('position')
            },
            setParamsToLocalStorage() {
                localStorage.setItem('totalProducts' , this.totalProducts = this.surveys.products.length - 1)
                localStorage.setItem('totalInstructionsQuestions', this.totalInstructionsQuestions = this.introductions.length + this.surveys.questions.length + this.instructionsUnique.length - 1)
                localStorage.setItem('position', this.position)
                localStorage.setItem('startInstructionsQuestions', this.introductions.length)
            }
        },
        watch : {
            position() {
                this.introductions.forEach(async (introduction) => {
                    if (introduction.position == this.position) {
                        this.introduction = introduction
                        this.setParamsToLocalStorage()
                        this.setHelperMessage()
                        this.speech()
                        await this.writeReponse(await this.STTService.speechToText())
                    }
                })
            }
        } 
    }
</script>
