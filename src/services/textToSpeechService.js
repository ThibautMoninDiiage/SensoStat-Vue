import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';

export default class TextToSpeechService {

    textToSpeech(productText) {
        const speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
        const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput()

        speechConfig.speechSynthesisLanguage = 'fr-FR'
        speechConfig.speechSynthesisVoiceName = 'fr-BE-CharlineNeural'
    
        const synthetizer = new SpeechSynthesizer(speechConfig, audioConfig)
        synthetizer.speakTextAsync(productText, result => {
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
    }
    
}
