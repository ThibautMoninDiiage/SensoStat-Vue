<template>
    <div>
        <form @submit="nextStep" id="mainContainer">
            <h1>{{ instruction }} {{ productNumber }}</h1>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Suivant"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" message="Suivant"/>
                </div>
            </div>
            <router-view/>
        </form>
    </div>
</template>

<script>
    import router from '../router/index'
    import MainButton from '../components/MainButton.vue'
    import MicrophoneText from '../components/MicrophoneText.vue'
    import TextToSpeechService from '../services/textToSpeechService'
    import SpeechToTextService from "../services/speechToTextService"

    export default {
        name : 'InstructionPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                instruction : undefined,
                productNumber : undefined,
                text : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService()
            }
        },
        mounted() {
            this.instruction = "Vous allez tester produit : "
            this.productNumber = 23
            this.text = this.instruction + this.productNumber
            this.TTSService.textToSpeech(this.text)
            var result = this.STTService.speechToText();
			this.writeReponse(result)
        },
        methods : {
            nextStep(event) {
                event.preventDefault()
                router.push({name : 'QuestionPage', params : { productNumber : this.productNumber }})
            },
            writeReponse(speechRecognizer){
                event.preventDefault()
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")){
                        router.push({name : 'QuestionPage', params : { productNumber : this.productNumber }})
            		}
          		};
			}
        }
    }
</script>
