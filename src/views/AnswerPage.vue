<template>
  <div class="mainContainer">
    <div></div>
    <div class="title">C'est à vous !</div>

    <textarea class="areaAnswer" rows="15" cols="30"></textarea>

    <button id="playAudio" @click="allowMicro">Test</button>


    <div id="microphoneContainer">
      <MainButton class="itemCentered" message="Commencer la séance" />
      <div id="iconText">
        <i class="fa-solid fa-microphone"></i>
        <MicrophoneText class="itemCentered" message="Commencer la séance" />
      </div>
    </div>
  </div>
</template>

<style scoped>
    @import "../../public/styles/answerPage.css";
</style>

<script>
    import router from "../router/index";
    import MainButton from "../components/MainButton.vue";
    import MicrophoneText from "../components/MicrophoneText.vue";
    import SpeechToTextService from "../services/speechToTextService.js"

    export default {
      name: "AnswerPage",
      components: {
        MainButton,
        MicrophoneText,
      },
      data() {
        return{
          STTService : new SpeechToTextService()
        }
      },
      methods:{
        allowMicro(){
          this.STTService.speechToText();
        }
      }
    };
</script>
