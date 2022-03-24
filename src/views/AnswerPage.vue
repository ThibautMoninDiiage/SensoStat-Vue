<template>
	<div>
		<form @submit="nextStep" id="mainContainer">
			<div class="title">{{ title }}</div>
    		<textarea class="areaAnswer" id="response" rows="15" cols="30"></textarea>

			<div id="microphoneContainer">
				<MainButton class="itemCentered" :message="mainButtonText"/>
				<div id="iconText">
        			<i id="mic" class="fa-solid fa-microphone"></i>
					<MicrophoneText class="itemCentered" :message="audioHelper"/>
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
			  	title : 'Parlez pour enregistrer votre réponse !',
				position : undefined,
				audioHelper : undefined,
			  	TTSService : new TextToSpeechService(),
				STTService : new SpeechToTextService(),
				response : undefined,
				mainButtonText : undefined,
				totalInstructionsQuestions : undefined
		  	}
	  	},
	  	async mounted() {
			this.mainButtonText = "Suivant"
			this.position = this.$route.params.position
            this.totalInstructionsQuestions = this.$route.params.totalInstructionsQuestions
            this.audioHelper = 'Pour confirmer votre réponse, dites "Suivant"'

		  	await this.TTSService.textToSpeech(this.title)
		  	await this.TTSService.textToSpeech(this.audioHelper)
			
			var result = await this.STTService.speechToText();
			await this.writeReponse(result)
	  	},
	  	methods : {
		  	async nextStep() {
				event.preventDefault()
				this.response = document.getElementById("response").innerHTML;
			  	router.push({name : 'ConfirmAnswerPage', params : { responseUser : this.response, position : this.position, totalInstructionsQuestions : this.totalInstructionsQuestions }})
		  	},
			writeReponse(speechRecognizer){
				let textarea = document.getElementById("response")
				let micro = document.getElementById("mic")
				textarea.textContent = ""
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")) {
              			this.response = document.getElementById("response").innerHTML;
						  this.nextStep()
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
