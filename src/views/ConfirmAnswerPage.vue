<template>
  <div class="mainContainer">
    <div id="microphoneContainerRetour">
      <MainButton @click="goBack" class="itemCentered" id="btnRetour" message="Reformuler"/>
      <div id="iconText">
        <i class="fa-solid fa-microphone"></i>
        <MicrophoneText class="itemCentered" message="Reformuler"/>
      </div>
    </div>

    <div class="title">C'est à vous !</div>

    <textarea class="areaAnswer" rows="15" cols="30"></textarea>

    <div></div>

    <div id="microphoneContainer">
      <MainButton class="itemCentered" message="Étape suivante"/>
      <div id="iconText">
        <i class="fa-solid fa-microphone"></i>
        <MicrophoneText class="itemCentered" message="Étape suivante"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
    @import "../../public/styles/confirmAnswerPage.css";
</style>

<script>
    import router from "../router/index";
    import MainButton from "../components/MainButton.vue";
    import MicrophoneText from "../components/MicrophoneText.vue";

    export default {
        name: "ConfirmAnswerPage",
        components: {
        MainButton,
        MicrophoneText,
      },
      methods : {
        goBack() {
          router.back()
        }
      }
    };
</script>
