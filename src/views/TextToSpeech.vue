<template>
    <button @click="speech" id="textToSpeech">Bouton cliquable</button>
    <h1 id="textToSpeech">Aujourd'hui vous allez déguster un savon</h1>
</template>

<style scoped>

</style>

<script>
    import * as sdk from "microsoft-cognitiveservices-speech-sdk";
    import { SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';

    export default {
        name : 'TextToSpeech',
        methods : {
            speech() {
                const speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
                speechConfig.speechSynthesisLanguage = 'fr-FR'
                speechConfig.speechSynthesisVoiceName = 'fr-BE-CharlineNeural'

                const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput()

                var text = document.getElementById('textToSpeech').innerText

                const synthetizer = new SpeechSynthesizer(speechConfig, audioConfig)
                synthetizer.speakTextAsync(text, result => {
                        if (result) {
                            synthetizer.close()
                            return result.audioData
                        }
                    },
                    error => {
                        console.log(error)
                        synthetizer.close()
                    }
                )
            },
        },
        mounted() {
            this.speech()
        }
    }

</script>
