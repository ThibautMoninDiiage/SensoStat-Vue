<template>
	<div>
		<form @submit="nextStep" id="mainContainer">
			<div class="title">{{ title }}</div>
    		<textarea class="areaAnswer" id="response" rows="15" cols="30"></textarea>

			<div id="microphoneContainer">
				<MainButton class="itemCentered" message="Suivant"/>
				<div id="iconText">
        			<i id="mic" class="fa-solid fa-microphone"></i>
					<MicrophoneText class="itemCentered" v-bind:message="vocalCommand"/>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
    import router from "../router/index";
    import MainButton from "../components/MainButton.vue";
    import MicrophoneText from "../components/MicrophoneText.vue";
	import TextToSpeechService from '../services/textToSpeechService'
    import SpeechToTextService from "../services/speechToTextService"

    export default {
      	name: "AnswerPage",
      	components: {
    		MainButton,
       		MicrophoneText,
      	},
	  	data() {
		  	return {
			  	title : 'C\'est à vous !',
				vocalCommand : undefined,
			  	text : undefined,
			  	TTSService : new TextToSpeechService(),
				STTService : new SpeechToTextService(),
				response : undefined
		  	}
	  	},
	  	mounted() {
		  	this.text = this.title
            this.vocalCommand = 'Cliquez sur le bouton, ou dites "Suivant"'
		  	this.TTSService.textToSpeech(this.text + this.vocalCommand)
			var result = this.STTService.speechToText();
			this.writeReponse(result)
	  	},
	  	methods : {
		  	nextStep(event) {
			  	event.preventDefault()
				this.response = document.getElementById("response").innerHTML;
			  	router.push({name : 'ConfirmAnswerPage', params : { responseUser : this.response}})
		  	},
			writeReponse(speechRecognizer){
				event.preventDefault()
				let textarea = document.getElementById("response")
				let micro = document.getElementById("mic")
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")) {
              			this.response = document.getElementById("response").innerHTML;
			  			router.push({name : 'ConfirmAnswerPage', params : { responseUser : this.response}})
            		}
					else {
						micro.style.color = "red";
						textarea.innerHTML = e.result.text
					}
          		};
			}
	 	}
    }
</script>
