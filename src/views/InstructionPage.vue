<template>
    <div v-if="instruction != null">
        <form @submit="nextStep" id="mainContainer">
            <h1>{{ instruction[position].Libelle }} {{ productNumber }}</h1>
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
    import SpeechToTextService from "../services/speechToTextService"
    import InstructionService from '../services/instructionService'

    export default {
        name : 'InstructionPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                instruction : undefined,
                position : undefined,
                vocalCommand : undefined,
                productNumber : undefined,
                text : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                InstructionService : new InstructionService()
            }
        },
        async mounted() {
            this.position = this.$route.params.position
            this.InstructionService.getInstruction().then(instruction => {
                this.instruction = instruction
            })
            this.vocalCommand = 'Cliquez sur le bouton, ou dites "Suivant"'
            this.productNumber = 23

            // await this.TTSService.textToSpeech(this.instruction + this.productNumber);
            await this.TTSService.textToSpeech("Mangez le produit" + this.productNumber);
            await this.TTSService.textToSpeech(this.vocalCommand);

            var result = await this.STTService.speechToText();
			await this.writeReponse(result)
        },
        methods : {
            async nextStep() {
                await this.TTSService.stopTextToSpeech();
                router.push({ name : 'QuestionPage', params : { position : this.position }})
            },
            async writeReponse(speechRecognizer){
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("suivant")){
                        this.nextStep();
            		}
          		};
			}
        }
    }
</script>
