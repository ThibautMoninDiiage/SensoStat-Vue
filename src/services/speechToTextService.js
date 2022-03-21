const sdk = require("microsoft-cognitiveservices-speech-sdk")
const speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
speechConfig.speechRecognitionLanguage = "fr-FR"
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput()
const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

export default class speechToTextService{
    async speechToText() {
        await speechRecognizer.startContinuousRecognitionAsync();
        return speechRecognizer
    }

    closeSTT(){
        speechRecognizer.stopContinuousRecognitionAsync()
    }
}
