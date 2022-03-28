import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';

export default class TextToSpeechService {

    speechConfig
    audioConfig
    synthetizer
    player

    constructor(){
        this.speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
        this.player = new sdk.SpeakerAudioDestination()
        this.audioConfig = sdk.AudioConfig.fromSpeakerOutput(this.player)
        this.speechConfig.speechSynthesisLanguage = 'fr-FR'
        this.speechConfig.speechSynthesisVoiceName = 'fr-BE-CharlineNeural'
        this.synthetizer = new SpeechSynthesizer(this.speechConfig, this.audioConfig)
    }

    async initialize(text) {
        this.synthetizer.speakTextAsync(text, result => {
            if (result) {
                return result.audioData
            }},
            error => {
                console.log(error)
                this.synthetizer.close()
            }
        )
    }

    async finalize() {
        this.player.pause()
    }

}
