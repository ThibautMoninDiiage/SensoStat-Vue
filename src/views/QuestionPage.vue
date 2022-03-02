<template>
    <div v-if="question != null">
        <form @submit="nextStep" id="mainContainer">
            <h1>{{ question[position].Libelle }}</h1>
            <div id="microphoneContainer">
                <MainButton class="itemCentered" message="Suivant"/>
                <div id="iconText">
                    <i class="fa-solid fa-microphone"></i>
                    <MicrophoneText class="itemCentered" v-bind:message="vocalCommand"/>
                </div>
            </div>
            <router-view/>
        </form>
    </div>
</template>

<script>
    import router from '../router/index'
    import MainButton from '../components/MainButton.vue'
    import MicrophoneText from '../components/MicrophoneText.vue'
    import TextToSpeechService from '../services/textToSpeechService'
    import SpeechToTextService from '../services/speechToTextService'
    import QuestionService from '../services/questionService'

    export default {
        name : 'QuestionPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                question : undefined,
                position : undefined,
                vocalCommand : undefined,
                productNumber : undefined,
                text : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                QuestionService : new QuestionService()
                
            }
        },
        async mounted() {
            this.question = 'Avez vous trouvé que produit 23 était salé ?'
            this.position = this.$route.params.position
            this.QuestionService.getQuestion().then(question => {
                this.question = question
            })
            this.vocalCommand = 'Cliquez sur le bouton, ou dites "Suivant"'

            await this.TTSService.textToSpeech(this.question);
            await this.TTSService.textToSpeech(this.vocalCommand);

            var result = await this.STTService.speechToText();
			await this.writeReponse(result)
        },
        methods : {
            async nextStep() {
                await this.TTSService.stopTextToSpeech();
                router.push({ name : 'AnswerPage', params : { position : this.position }})
            },
            async writeReponse(speechRecognizer){
            writeReponse(speechRecognizer){
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")){
              			this.nextStep();
              			router.push({ name : 'AnswerPage', params : { position : this.position }});
            		}
          		};
			}
        }
    }
</script>
