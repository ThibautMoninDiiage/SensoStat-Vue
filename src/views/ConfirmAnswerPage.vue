<template>
	<div id="mainContainer">
    	<div id="microphoneContainerGoBack">
      		<MainButton @click="goBack" class="itemCentered" id="btnRetour" :message="reformulateButtonText"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" :message="audioHelperReformulate"/>
			</div>
    	</div>

    	<textarea class="areaAnswer" id="userAnswer" rows="15" cols="30" v-model="userAnswer"/>

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
		data() {
			return {
				STTService : new SpeechToTextService(),
				TTSService : new TextToSpeechService(),
				AnswerService : new AnswerService(),
				AuthService : new AuthService(),
				position : undefined,
				audioHelperReformulate : undefined,
				reformulateButtonText : undefined,
				confirmButtonText : undefined,
				audioHelper : undefined,
				userAnswer : undefined,
				totalInstructionsQuestions : undefined,
				totalProducts : undefined,
				token : undefined,
				questionId : undefined,
				productId : undefined,
				productPosition : undefined,
				startInstructionsQuestions : undefined
			}
		},
		async mounted() {
			this.getParamsFromLocalStorage()
			this.setHelperMessage()
			this.speech()
			await this.writeReponse(await this.STTService.speechToText())
		},
		methods : {
			async goBack() {
				event.preventDefault()
				this.TTSService.finalize()
          		router.back()
        	},
			async endSurvey() {
				event.preventDefault()
				this.TTSService.finalize()
				this.AnswerService.saveUserAnswer(this.userAnswer, this.questionId, this.token, this.productId)
				if (this.totalInstructionsQuestions == this.position && this.totalProducts !== this.productPosition) {
					this.incrementProductPosition()
					this.position = this.startInstructionsQuestions
					this.setParamsToLocalStorage()
					router.push({
						name : 'InstructionPage'
					})
				} else if (this.totalInstructionsQuestions !== this.position && this.totalProducts !== this.productPosition) {
					this.incrementPosition()
					this.setParamsToLocalStorage()
					router.push({
						name : 'InstructionPage'
					})
				}
				else if(this.totalInstructionsQuestions !== this.position && this.totalProducts == this.productPosition){
					this.incrementPosition()
					this.setParamsToLocalStorage()
					router.push({
						name : 'InstructionPage'
					})
				}
				else if (this.totalInstructionsQuestions == this.position && this.totalProducts == this.productPosition){
					router.push('/endPage')
				}
			},
			async writeReponse(speechRecognizer){
				speechRecognizer.recognized = (s, e) => {
					if (e.result.text.toLowerCase().includes("cliquez") && e.result.text.toLowerCase().includes("suivant")){
                    }
            		else if(e.result.text.toLowerCase().includes("valider")){
						this.endSurvey()
            		}
					else if(e.result.text.toLowerCase().includes("reformuler")){
						this.goBack()
					}
          		}
			},
            async incrementPosition() {
                this.position ++
            },
            async incrementProductPosition() {
                this.productPosition ++
            },
			async speech() {
				await this.TTSService.initialize(this.audioHelperReformulate)
				await this.TTSService.initialize(this.audioHelper)
			},
			setHelperMessage() {
				this.reformulateButtonText = "Reformuler"
				this.confirmButtonText = "Valider"
				this.audioHelperReformulate = 'Pour reformuler votre r??ponse, cliquez sur le bouton ou dites Reformuler'
				this.audioHelper = 'Pour confirmer votre r??ponse, cliquez sur le bouton ou dites Valider'
			},
			getParamsFromLocalStorage() {
            	this.token = this.AuthService.getTokenFromLocalStorage()
                this.position = localStorage.getItem('position')
                this.totalProducts = localStorage.getItem('totalProducts')
                this.totalInstructionsQuestions = localStorage.getItem('totalInstructionsQuestions')
                this.productPosition = localStorage.getItem('productPosition')
				this.questionId = localStorage.getItem('questionId')
				this.productId = localStorage.getItem('productId')
				this.userAnswer = localStorage.getItem('userAnswer')
                this.startInstructionsQuestions = localStorage.getItem('startInstructionsQuestions')
            },
			setParamsToLocalStorage() {
                localStorage.setItem('position', this.position)
				localStorage.setItem('productPosition', this.productPosition)
				localStorage.setItem('userAnswer',this.userAnswer)
            }
		}
    }
</script>
