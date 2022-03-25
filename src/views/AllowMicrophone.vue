<template>
    <div id="mainContainer">
        <h1>{{ message }}</h1>
        <MainButton @click="welcomePage" :message="mainButtonText"/>
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
                position : 0,
                productPosition : 0,
                mainButtonText : undefined,
                message : undefined
            }
        },
        mounted() {
            this.getUrlParams()
            this.setHelperMessage()
            this.setParamsToLocalStorage()
            this.AuthService.setTokenToLocalStorage(this.token)
        },
        methods : {
            welcomePage() {
                event.preventDefault()
                this.STTService.speechToText()
                router.push({
                    name: "WelcomePage"
                })
            },
            getUrlParams() {
                this.token = this.$route.params.token
            },
            setHelperMessage() {
                this.message = "Pour le bon fonctionnement de l'application, nous avons besoin d'utiliser votre microphone et votre sortie audio."
                this.mainButtonText = "Autoriser"
            },
            setParamsToLocalStorage() {
                localStorage.setItem('position', this.position)
                localStorage.setItem('productPosition', this.productPosition)
            }
        }
    }
</script>
