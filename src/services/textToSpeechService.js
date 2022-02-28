import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
const speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput()

speechConfig.speechSynthesisLanguage = 'fr-FR'
speechConfig.speechSynthesisVoiceName = 'fr-BE-CharlineNeural'

const synthetizer = new SpeechSynthesizer(speechConfig, audioConfig)

export default class TextToSpeechService {

    textToSpeech(productText) {
        synthetizer.speakTextAsync(productText)
    }
    
}
