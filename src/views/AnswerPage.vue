<template>
	<div class="mainContainer">
		<form @submit="nextStep" id="mainContainer">
			<div class="title">{{ title }}</div>

			<textarea class="areaAnswer" rows="15" cols="30"></textarea>

			<div id="microphoneContainer">
				<MainButton class="itemCentered" message="Étape suivante"/>
				<div id="iconText">
					<i class="fa-solid fa-microphone"></i>
					<MicrophoneText class="itemCentered" message="Étape suivante"/>
				</div>
			</div>
		</form>
	</div>
</template>

<style scoped>
    @import "../../public/styles/answerPage.css";
</style>

<script>
    import router from "../router/index"
    import MainButton from "../components/MainButton.vue"
    import MicrophoneText from "../components/MicrophoneText.vue"
	import TextToSpeechService from '../services/textToSpeechService'

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
		  }
	  }
    }
</script>
