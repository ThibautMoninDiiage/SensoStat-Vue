const fs = require('fs');
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription('1e006e65b78049bc83e6f795d1e3d893', 'francecentral')
speechConfig.speechRecognitionLanguage = "fr-FR";

export default class speechToTextService{
    speechToText() {
        let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        speechRecognizer.recognizeOnceAsync(result => {
            switch (result.reason) {
                case sdk.ResultReason.RecognizedSpeech:
                    console.log(`RECOGNIZED: Text=${result.text}`);
                    break;
                case sdk.ResultReason.NoMatch:
                    console.log("NOMATCH: Speech could not be recognized.");
                    break;
                case sdk.ResultReason.Canceled:
                    const cancellation = CancellationDetails.fromResult(result);
                    console.log(`CANCELED: Reason=${cancellation.reason}`);

                    if (cancellation.reason == sdk.CancellationReason.Error) {
                        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                        console.log("CANCELED: Did you update the key and location/region info?");
                    }
                    break;
            }    
            speechRecognizer.close();
        });
    }
}