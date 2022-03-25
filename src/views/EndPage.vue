<template>
    <div id="mainContainer">
        <h1>{{ endMessage }}</h1>
    </div>
</template>

<script>
    import TextToSpeechService from '../services/textToSpeechService'
    import SpeechToTextService from '../services/speechToTextService'
    import SurveyService from '../services/surveyService'
    import AuthService from '../services/authService'

    export default {
        name : 'EndPage',
        data() {
            return {
                TTSService : new TextToSpeechService(),
                STTService : new SpeechToTextService(),
                SurveyService : new SurveyService(),
                AuthService : new AuthService(),
                endMessage : undefined,
                token : undefined,
                surveys : undefined
            }
        },
        async mounted() {
            this.token = this.AuthService.getTokenFromLocalStorage()

            this.surveys = await this.SurveyService.getSurvey(this.token)
            this.surveys.instructions.forEach(instruction => {
                if (instruction.status == 2) {
                    this.endMessage = instruction.libelle
                }
            })

            await this.TTSService.textToSpeech(this.endMessage)
            await this.STTService.closeSTT()
        }
    }
</script>
