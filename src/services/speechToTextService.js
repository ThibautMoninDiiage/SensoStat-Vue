const fs = require('fs');
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
speechConfig.speechRecognitionLanguage = "fr-FR";

export default class speechToTextService{
    async speechToText() {
        let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        speechRecognizer.recognizeOnceAsync(result => {
            console.log(result.text);
            return new Promise((resolve)=>{
                resolve(result.text);
            });
        });
    }

    async TakeResult(message){
        let result = message;
        return result;
    }
}