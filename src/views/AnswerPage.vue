<template>
	<div class="mainContainer">
		<form @submit="nextStep" id="mainContainer">
			<div class="title">{{ title }}</div>
    <textarea class="areaAnswer" id="response" rows="15" cols="30"></textarea>

    <button id="playAudio" @click="allowMicro">Test</button>

			<div id="microphoneContainer">
				<MainButton class="itemCentered" message="Suivant"/>
				<div id="iconText">
        <i id="mic" class="fa-solid fa-microphone"></i>
					<MicrophoneText class="itemCentered" message="Suivant"/>
				</div>
			</div>
		</form>
	</div>
</template>

<style scoped>
    @import "../../public/styles/answerPage.css";
</style>

<script>
    import router from "../router/index";
    import MainButton from "../components/MainButton.vue";
    import MicrophoneText from "../components/MicrophoneText.vue";
	import TextToSpeechService from '../services/textToSpeechService'
    import SpeechToTextService from "../services/speechToTextService.js"

    export default {
      	name: "AnswerPage",
      	components: {
    		MainButton,
       		MicrophoneText,
      	},
	  	data() {
		  	return {
			  	title : 'C\'est à vous !',
			  	text : undefined,
			  	TTSService : new TextToSpeechService()
		  	}
	  	},
	  	mounted() {
		  	this.text = this.title
		  	this.TTSService.textToSpeech(this.text)
	  	},
	  	methods : {
		  	nextStep(event) {
			  	event.preventDefault()
			  	router.push('/confirmAnswerPage')
		  	},
      		async allowMicro(){
				event.preventDefault()
          		var test = document.getElementById("response");
          		var micro = document.getElementById("mic");
          		const sdk = require("microsoft-cognitiveservices-speech-sdk");
          		const speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
          		speechConfig.speechRecognitionLanguage = "fr-FR";
          		let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
          		let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
          		speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")){
              			router.push('/confirmAnswerPage');
            		}
            		else{
              			micro.style.color = "red";
              			test.innerHTML = test.innerHTML + " " + e.result.text.toLowerCase().replace(test.innerHTML.toLowerCase()," ");
            		}
          		};
          		speechRecognizer.startContinuousRecognitionAsync();
        	}
	 	}
    }
</script>
