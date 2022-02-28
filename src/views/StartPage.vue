<template>
    <div>
        <form @submit="startSurvey" id="mainContainer">
            <div id="title">{{ welcomeMessage }}</div>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Commencer la séance"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" v-bind:message="vocalCommand"/>
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
    import SpeechToTextService from '../services/speechToTextService'
    import SurveyService from '../services/surveyService'
    import ProductService from '../services/productService'

    export default {
        name : 'StartPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                welcomeMessage : undefined,
                vocalCommand : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                SurveyService : new SurveyService(),
                ProductService : new ProductService(),
                products : undefined
            }
        },
        mounted() {
            this.welcomeMessage = 'Bienvenue à notre séance de tests'
            this.vocalCommand = 'Cliquez sur le bouton, ou dites "Commencer"'
            this.TTSService.textToSpeech(this.welcomeMessage + this.vocalCommand)
            var result = this.STTService.speechToText()
			this.writeReponse(result)
            this.SurveyService.getSurveyByUserId().then(survey => {
                // console.log(survey)
            })
            this.ProductService.getUserProducts().then(products => {
                this.products = products
            })
        },
        methods : {
            startSurvey(event) {
                event.preventDefault()
                router.push({ name : 'InstructionPage', params : { position : 0 }})
            },
            writeReponse(speechRecognizer){
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("commencer")){
              			router.push({ name : 'InstructionPage', params : { position : 0 }})
            		}
          		};
			}
        }
    }
</script>
