<template>
	<div id="mainContainer">
    	<div id="microphoneContainerGoBack">
      		<MainButton @click="goBack" class="itemCentered" id="btnRetour" :message="reformulateButtonText"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" :message="audioHelperReformulate"/>
			</div>
    	</div>

    	<textarea class="areaAnswer" id="userAnswer" rows="15" cols="30"></textarea>

		<div id="microphoneContainer">
			<MainButton @click="endSurvey" class="itemCentered" :message="confirmButtonText"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" :message="audioHelper"/>
			</div>
		</div>
	</div>
</template>

<script>
    import router from "../router/index"
    import MainButton from "../components/MainButton.vue"
    import MicrophoneText from "../components/MicrophoneText.vue"
	import SpeechToTextService from '../services/speechToTextService'
	import TextToSpeechService from '../services/textToSpeechService'
	import AnswerService from '../services/answerService'
	import AuthService from '../services/authService'

    export default {
        name: "ConfirmAnswerPage",
        components: {
        	MainButton,
        	MicrophoneText,
    	},
		data(){
			return{
				position : undefined,
				audioHelperReformulate : undefined,
				reformulateButtonText : undefined,
				confirmButtonText : undefined,
				audioHelper : undefined,
				STTService : new SpeechToTextService(),
				TTSService : new TextToSpeechService(),
				AnswerService : new AnswerService(),
				AuthService : new AuthService(),
				userAnswer : undefined,
				totalInstructionsQuestions : undefined,
				token : undefined,
				questionId : undefined,
				productId : undefined
			}
		},
		async mounted(){
			this.position = this.$route.params.position
			this.totalInstructionsQuestions = this.$route.params.totalInstructionsQuestions
            this.token = this.AuthService.getTokenFromLocalStorage()
			this.questionId = 10
			this.productId = 64
			this.reformulateButtonText = "Reformuler"
			this.confirmButtonText = "Valider"
            this.audioHelperReformulate = 'Pour reformuler votre réponse, cliquez sur le bouton ou dites "Reformuler"'
            this.audioHelper = 'Pour confirmer votre réponse, cliquez sur le bouton ou dites "Valider"'

			await this.TTSService.textToSpeech(this.audioHelperReformulate)
			await this.TTSService.textToSpeech(this.audioHelper)

			var result = await this.STTService.speechToText();
			await this.writeReponse(result)

			this.userAnswer = this.$route.params.responseUser;
			let text = document.getElementById("userAnswer")
			text.innerHTML = this.userAnswer;
		},
		methods : {
			async goBack() {
				event.preventDefault()
          		router.back()
        	},
			async endSurvey() {
				event.preventDefault()
				this.AnswerService.saveUserAnswer(this.userAnswer, this.questionId, this.token, this.productId)
				if (this.totalInstructionsQuestions !== this.position) {
					this.incrementPosition()
					router.push({
						name : 'InstructionPage',
						params: {
							position: this.position,
							totalInstructionsQuestions : this.totalInstructionsQuestions
						}
					})
				} else {
					router.push('/endPage')
				}
			},
			writeReponse(speechRecognizer){
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("valider")){
						this.endSurvey()
            		}
					else if(e.result.text.toLowerCase().includes("reformuler")){
						this.goBack()
					}
          		}
			},
            async incrementPosition() {
                this.position ++
                String(this.position)
            },
		}
    }
</script>
