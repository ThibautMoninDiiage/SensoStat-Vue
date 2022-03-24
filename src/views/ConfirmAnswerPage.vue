<template>
	<div id="mainContainer">
    	<div id="microphoneContainerGoBack">
      		<MainButton @click="goBack" class="itemCentered" id="btnRetour" :message="reformulateButtonText"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" :message="audioHelperReforumulate"/>
			</div>
    	</div>

    	<textarea class="areaAnswer" id="response" rows="15" cols="30"></textarea>

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

    export default {
        name: "ConfirmAnswerPage",
        components: {
        	MainButton,
        	MicrophoneText,
    	},
		data(){
			return{
				position : undefined,
				reformulateButtonText : undefined,
				confirmButtonText : undefined,
				STTService : new SpeechToTextService(),
				TTSService : new TextToSpeechService(),
				response : undefined,
				vocalReformulate : undefined,
				totalInstructionsQuestions : undefined
			}
		},
		async mounted(){
			this.position = this.$route.params.position
			this.totalInstructionsQuestions = this.$route.params.totalInstructionsQuestions
			this.reformulateButtonText = "Reformuler"
			this.confirmButtonText = "Valider"
            this.audioHelperReforumulate = 'Pour reformuler votre réponse, cliquez sur le bouton ou dites "Reformuler"'
            this.audioHelper = 'Pour confirmer votre réponse, cliquez sur le bouton ou dites "Valider"'

			await this.TTSService.textToSpeech(this.vocalReformulate)
			await this.TTSService.textToSpeech(this.audioHelper)

			var result = await this.STTService.speechToText();
			await this.writeReponse(result)

			this.response = this.$route.params.responseUser;
			let text = document.getElementById("response")
			text.innerHTML = this.response;
		},
		methods : {
			async goBack() {
				event.preventDefault()
          		router.back()
        	},
			async endSurvey() {
				event.preventDefault()
				if (this.totalInstructionsQuestions !== this.position + 1) {
					this.incrementPosition()
					router.push({ name : 'InstructionPage', params: { position: this.position, totalInstructionsQuestions : this.totalInstructionsQuestions }})
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
