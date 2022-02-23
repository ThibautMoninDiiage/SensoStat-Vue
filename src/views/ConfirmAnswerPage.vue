<template>
	<div class="mainContainer">
    	<div id="microphoneContainerGoBack">
      <MainButton @click="goBack" class="itemCentered" id="btnRetour" message="Reformuler"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" message="Reformuler"/>
			</div>
    	</div>

    	<textarea class="areaAnswer" rows="15" cols="30"></textarea>

		<div id="microphoneContainer">
			<MainButton @click="endSurvey" class="itemCentered" message="Valider"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" message="Valider"/>
			</div>
		</div>
	</div>
</template>

<style scoped>
    @import "../../public/styles/confirmAnswerPage.css";
</style>

<script>
    import router from "../router/index";
    import MainButton from "../components/MainButton.vue";
    import MicrophoneText from "../components/MicrophoneText.vue";
	import SpeechToTextService from '../services/speechToTextService'

    export default {
        name: "ConfirmAnswerPage",
        components: {
        	MainButton,
        	MicrophoneText,
    	},
		data(){
			return{
				STTService : new SpeechToTextService()
			}
		},
		mounted(){
			var result = this.STTService.speechToText();
			this.writeReponse(result)
		},
		methods : {
			goBack() {
          		router.back()
        	},
			endSurvey(event) {
				event.preventDefault()
				router.push('/endPage')
			},
			writeReponse(speechRecognizer){
                event.preventDefault()
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("valider")){
              			router.push('/endPage');
            		}
          		};
			}
		}
    }
</script>
