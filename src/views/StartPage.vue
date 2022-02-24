<template>
    <div>
        <form @submit="startSurvey" id="mainContainer">
            <div id="title">{{ title }}</div>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Commencer la séance"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" message="Commencer"/>
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

    export default {
        name : 'StartPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                title : undefined,
                instruction : undefined,
                product : undefined,
                text : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService()
            }
        },
        mounted() {
            this.title = 'Bienvenue à notre séance de tests'
            this.TTSService.textToSpeech(this.title)
            var result = this.STTService.speechToText();
			this.writeReponse(result)
        },
        methods : {
            startSurvey(event) {
                event.preventDefault()
                router.push('/instructionPage')
            },
            writeReponse(speechRecognizer){
                event.preventDefault()
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("commencer")){
              			router.push('/instructionPage');
            		}
          		};
			}
        }
    }
</script>
