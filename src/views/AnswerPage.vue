<template>
	<div>
		<form @submit="nextStep" id="mainContainer">
			<div class="title">{{ title }}</div>
    		<textarea class="areaAnswer" id="userAnswer" rows="15" cols="30"></textarea>

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
			  	TTSService : new TextToSpeechService(),
				STTService : new SpeechToTextService(),
			  	title : undefined,
				position : undefined,
				audioHelper : undefined,
				userAnswer : undefined,
				mainButtonText : undefined,
				totalInstructionsQuestions : undefined,
				questionId : undefined,
				productId : undefined,
				productPosition : undefined,
				totalProducts : undefined
		  	}
	  	},
	  	async mounted() {
			this.getParamsFromLocalStorage()
			this.setHelperMessage()
			this.speech()
			
			await this.writeReponse(await this.STTService.speechToText())
	  	},
	  	methods : {
		  	async nextStep() {
				event.preventDefault()
				this.TTSService.finalize()
				this.userAnswer = document.getElementById("userAnswer").innerHTML
				this.setParamsToLocalStorage()
			  	router.push({
					name : 'ConfirmAnswerPage'
				})
		  	},
			async writeReponse(speechRecognizer){
				let textarea = document.getElementById("userAnswer")
				let micro = document.getElementById("mic")
				textarea.textContent = ""
				speechRecognizer.recognized = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")) {
              			this.userAnswer = document.getElementById("userAnswer").innerHTML;
						  this.nextStep()
            		}
					else {
						micro.style.color = "red";
						textarea.innerHTML = e.result.text
					}
          		}
			},
			async speech() {
		  		await this.TTSService.initialize(this.title)
		  		await this.TTSService.initialize(this.audioHelper)
			},
			setHelperMessage() {
				this.title = 'Parlez pour enregistrer votre réponse !'
				this.mainButtonText = 'Suivant'
            	this.audioHelper = 'Pour confirmer votre réponse, dites "Suivant"'
			},
            getParamsFromLocalStorage() {
                this.position = localStorage.getItem('position')
                this.totalProducts = localStorage.getItem('totalProducts')
                this.totalInstructionsQuestions = localStorage.getItem('totalInstructionsQuestions')
                this.productPosition = localStorage.getItem('productPosition')
				this.questionId = localStorage.getItem('questionId')
				this.productId = localStorage.getItem('productId')
            },
			setParamsToLocalStorage() {
                localStorage.setItem('userAnswer', this.userAnswer)
				localStorage.setItem('position', this.position)
				localStorage.setItem('productPosition', this.productPosition)
            }
	 	}
    }
</script>
