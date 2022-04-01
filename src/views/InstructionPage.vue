<template>
    <div v-if="message !== undefined">
        <form @submit="nextStep" id="mainContainer">
            <h1>Produit {{ products[productPosition].code }}</h1>
            <h1>{{ message.libelle }}</h1>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" :message="mainButtonText"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" :message="audioHelper"/>
                </div>
            </div>
            <router-view/>
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
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                AuthService : new AuthService(),
                surveyService : new SurveyService(),
                surveys : [],
                instructions : [],
                questions : [],
                instructionsQuestions : [],
                products : [],
                position : undefined,
                audioHelper : undefined,
                mainButtonText : undefined,
                token : undefined,
                message : undefined,
                type : undefined,
                totalInstructionsQuestions : undefined,
                questionId : undefined,
                productPosition : undefined,
                productId : undefined,
                totalProducts : undefined
            }
        },
        async mounted() {
            this.getParamsFromLocalStorage()
            this.setHelperMessage()

            this.surveys = await this.surveyService.getSurvey(this.token)
            this.instructions = this.surveys.instructions
            this.questions = this.surveys.questions
            this.products = this.surveys.products
            this.productId = this.products[this.productPosition].id

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

            this.verifyType()
            this.setParamsToLocalStorage()
            this.speech()
            await this.writeReponse(await this.STTService.speechToText())
        },
        methods: {
            async nextStep() {
                event.preventDefault()
                this.TTSService.finalize()
                if (this.type === "Instruction") {
                    this.incrementPosition()
                    this.setParamsToLocalStorage()
                    router.push({
                        name : "InstructionPage"
                    })
                } else {
                    this.setParamsToLocalStorage()
                    router.push({
                        name: "AnswerPage"
                    })
                }
            },
            async writeReponse(speechRecognizer) {
                speechRecognizer.recognized = (s, e) => { 
                    if (e.result.text.toLowerCase().includes("cliquez") && e.result.text.toLowerCase().includes("suivant")){
                    } 
                    else if (e.result.text.toLowerCase().includes("suivant")) {
                        this.nextStep();
                    }
                }
            },
            async speech() {
                await this.TTSService.initialize(this.message.libelle)
                await this.TTSService.initialize(this.audioHelper)
            },
            async incrementPosition() {
                this.position ++
            },
            verifyType() {
                if (this.message.status) {
                    this.type = "Instruction"
                } else {
                    this.type = "Question"
                    this.questionId = this.message.id
                }
            },
            setHelperMessage() {
                this.mainButtonText = "Suivant"
                this.audioHelper = 'Cliquez sur le bouton, ou dites Suivant'
            },
            getParamsFromLocalStorage() {
                this.token = this.AuthService.getTokenFromLocalStorage()
                this.position = localStorage.getItem('position')
                this.totalProducts = localStorage.getItem('totalProducts')
                this.totalInstructionsQuestions = localStorage.getItem('totalInstructionsQuestions')
                this.productPosition = localStorage.getItem('productPosition')
            },
            setParamsToLocalStorage() {
                localStorage.setItem('position', this.position)
                localStorage.setItem('productPosition', this.productPosition)
                localStorage.setItem('questionId', this.questionId)
                localStorage.setItem('productId', this.productId)
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
