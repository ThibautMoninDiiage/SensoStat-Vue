<template>
    <div>
        <form @submit="nextStep" id="mainContainer">
            <h1>{{ question }}</h1>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Suivant"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" v-bind:message="vocalCommand"/>
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
    import SpeechToTextService from '../services/speechToTextService'
    import QuestionService from '../services/questionService'

    export default {
        name : 'QuestionPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                question : undefined,
                vocalCommand : undefined,
                productNumber : undefined,
                text : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                QuestionService : new QuestionService()
                
            }
        },
        async mounted() {
            await this.QuestionService.getQuestion().then(question => {
                this.question = question
            })
            this.vocalCommand = 'Cliquez sur le bouton, ou dites "Suivant"'
            this.text = this.question
            this.TTSService.textToSpeech(this.text + this.vocalCommand)
            var result = this.STTService.speechToText();
			this.writeReponse(result)
        },
        methods : {
            nextStep(event) {
                event.preventDefault()
                router.push('/answerPage')
            },
            writeReponse(speechRecognizer){
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")){
              			router.push('/answerPage');
            		}
          		};
			}
        }
    }
</script>
