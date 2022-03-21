<template>
    <div id="mainContainer">
        <h1>Pour le bon fonctionnement de l'application, nous avons besoin d'utiliser votre microphone et votre sortie audio.</h1>
        <MainButton @click="startPage" message="Autoriser"/>
    </div>
</template>

<script>
    import router from '../router/index'
    import MainButton from '../components/MainButton.vue'
    import STTService from '../services/speechToTextService'
    import AuthService from '../services/authService'

    export default {
        name : 'AllowMicrophone',
        components : {
            MainButton
        },
        data() {
            return {
                STTService : new STTService(),
                AuthService : new AuthService(),
                token : undefined,
                position : 0
            }
        },
        mounted() {
            this.token = this.$route.params.token
            this.AuthService.setTokenToLocalStorage(this.token)
        },
        methods : {
            startPage() {
                event.preventDefault()
                this.STTService.speechToText()
                router.push({ name: "WelcomePage", params: { position: this.position }})
            }
        }
    }
</script>
