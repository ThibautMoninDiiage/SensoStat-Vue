<template>
    <div id="mainContainer">
        <h1>{{ title }}</h1>
        <h1>{{ subtitle }}</h1>
    </div>
</template>

<script>
    import TextToSpeechService from '../services/textToSpeechService'
    import SpeechToTextService from '../services/speechToTextService'

    export default {
        name : 'EndPage',
        data() {
            return {
                title : undefined,
                subtitle : undefined,
                text : undefined,
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService()
            }
        },
        mounted() {
            this.title = "Merci de votre participation à cette séance"
            this.subtitle = "Vous pouvez fermer cette page"
            this.text = this.title + this.subtitle
            this.TTSService.textToSpeech(this.text)
            this.STTService.closeSTT()
        }
    }
</script>
